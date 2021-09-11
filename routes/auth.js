const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const jwt = require('jsonwebtoken');
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

//Routs
router.post('/login', async (req, res) => {
  const { body } = req;
  const user = await sequelize.models.professionals.findOne({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (!user.validPassword(body.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate a token
  const token = jwt.sign({ userId: user.id }, 'secretkey', {
    expiresIn: process.env.JWT_EXPIRESIN,
  });

  return res.json({
    message: 'Authenticated sucessfully',
    token,
  });
});

router.post('/signup', async (req, res) => {
  const { body } = req;
  let user = await sequelize.models.professionals.findOne({
    where: {
      email: body.email,
    },
  });

  if (user) {
    console.log('Error');
    return res
      .status(401)
      .json({ message: 'this email is already registered' });
  }

  // Creating the user
  user = await sequelize.models.professionals.create({
    email: body.email,
    password: body.password,
    type: 'professional',
  });

  // Saving user
  await user.save();
  return res.json({ message: 'Your account was created successfully' });
});


router.post('/recruiters/login', async (req, res) => {
  const { body } = req;
  const user = await sequelize.models.recruiters.findOne({
    where: {
      administrator_email: body.email,
    },
  });

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (!user.validPassword(body.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate a token
  const token = jwt.sign({ userId: user.id }, 'secretkey', {
    expiresIn: '10h',
  });

  return res.json({
    message: 'Authenticated sucessfully',
    token,
  });
});

router.post('/recruiters/signup',upload.single('logo'), async (req, res) => {
  const { body } = req;
 
  let recruiter = await sequelize.models.recruiters.findOne({
    where: {
      administrator_email: body.email,
    },
  });

  if (recruiter) {
    return res
      .status(401)
      .json({ message: 'this email is already registered' });
  }

  // Creating the recruiter
  recruiter = await sequelize.models.recruiters.create({
    company_name: body.name,
    logo: req.file.path,
    company_website: body.web,
    administrator_email: body.email,
    password: body.password,
    description: body.description,
    type: 'recruiter',
  });

  // Saving recruiter
  await recruiter.save();
  return res.json({ message: 'Your account was created successfully' });
});



module.exports = router;
