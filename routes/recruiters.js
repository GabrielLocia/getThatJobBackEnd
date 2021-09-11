const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const multer = require('multer');
const mimeTypes = require('mime-types');

//Middlewares
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'logo')
      }, 
    
  filename: function (req, file, cb) {
    cb("",Date.now() + file.originalname + "." + mimeTypes.extension(file.mimetype));
  }
});

const upload = multer({
  storage: storage
});



// Get recuiter
router.get('/', async (req, res) => {
// const candidate = await sequelize.models.candidates.findAndCountAll();
  const recruiter = await sequelize.models.recruiters.findOne({
    where: { id: req.user.id },
    attributes: {
            exclude: ['password']
          }
  });

  
  return res.status(200).json({ data: recruiter });
});




// Update a recruiter by id
router.put('/',upload.single('logo'),async (req, res) => {
  const {body} = req

  const recruiter = await sequelize.models.recruiters.findByPk(req.user.id);
  if (!recruiter) {
    return res.status(404).json({ code: 404, message: 'recruiter not found' });
  }
  const updatedrecruiter = await recruiter.update({
    company_name: body.name,
    logo: req.file.path,
    company_website: body.web,
    administrator_email: body.email,
    password: body.password,
    description: body.description,
    type: 'recruiter',
  });
  return res.json({ data: updatedrecruiter });
});

// Delete a recruiter by id
// router.delete('/:id', async (req, res) => {
//   const {
//     params: { id },
//   } = req;
//   const recruiter = await sequelize.models.reviews.findByPk(id);
//   if (!review) {
//     return res.status(404).json({ code: 404, message: 'Review not found' });
//   }
//   await review.destroy();
//   return res.json();
// });

module.exports = router;
