const jwt = require('jsonwebtoken');
const sequelize = require('../db');
let rol;
const role = (role)=>{
    rol = role;
    console.log("role: ", role)
}

const authenticate = (req, res, next) => {
    const { authorization } = req.headers;

    if(rol==="professional"){
        
        jwt.verify(authorization,  process.env.JWT_SECRETKEY, async (err, decoded) => {
            if(err) return res.status(401).json({ message: 'Unauthorized', error: err});
            req.user = await sequelize.models.professionals.findOne({ where: { id: decoded.userId }});
            next();
        })
    }else{
 
        jwt.verify(authorization,  process.env.JWT_SECRETKEY, async (err, decoded) => {
            if(err) return res.status(401).json({ message: 'Unauthorized', error: err});
            req.user = await sequelize.models.recruiters.findOne({ where: { id: decoded.userId }});
            next();
        })
    }
}

module.exports = {
    authenticate,
    role
}