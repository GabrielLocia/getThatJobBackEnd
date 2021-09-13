const jwt = require("jsonwebtoken");
const sequelize = require("../db");
let rol;
const role = (role) => {
  rol = role;
  console.log("role: ", role);
};

const authenticate = (req, res, next) => {
  const { authorization } = req.headers;

  jwt.verify(authorization, process.env.JWT_SECRETKEY, async (err, decoded) => {
    console.log("type", decoded.type);
    if (err)

    
      return res.status(401).json({ message: "Unauthorized", error: err });
    if (decoded.type === "professional") {
      console.log("pofesssional");
      req.user = await sequelize.models.professionals.findOne({
        where: { id: decoded.userId },
      });
    } else if (decoded.type === "recruiter") {
      console.log("recruitersss");
      req.user = await sequelize.models.recruiters.findOne({
        where: { id: decoded.userId },
      });
    }

    next();
  });
};

module.exports = {
  authenticate,
  role,
};
