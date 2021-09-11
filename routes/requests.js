const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const multer = require('multer');
const mimeTypes = require('mime-types');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'cv');
  },

  filename: function (req, file, cb) {
    cb(
      '',
      Date.now() + file.originalname + '.' + mimeTypes.extension(file.mimetype)
    );
  },
});

const upload = multer({
  storage: storage,
});

// Get request General
router.get('/', async (req, res) => {
  const candidate = await sequelize.models.candidates.findOne({
    attributes: ['id'],
    where: {
      professionalId: req.user.id,
    },
  });
  const request = await sequelize.models.requests.findAll({
    

    where: {
      candidateId: candidate.id,
    },
   
  });
  return res.status(200).json({ data: request });
});


//requests with candidate
router.get('/candidate', async (req, res) => {
  const candidate = await sequelize.models.candidates.findOne({
    attributes: ['id'],
    where: {
      professionalId: req.user.id,
    },
  });
  const request = await sequelize.models.requests.findAll({
    
    include:[{
      model: sequelize.models.candidates,
   
    }],
    include: [{
      model: sequelize.models.jobs,
      attributes: ['title']
    }],
    where: {
      candidateId: candidate.id,
    },
   
  });
  return res.status(200).json({ data: request });
});
//requests with jobs
router.get('/job', async (req, res) => {
  const candidate = await sequelize.models.candidates.findOne({
    attributes: ['id'],
    where: {
      professionalId: req.user.id,
    },
  });
  const request = await sequelize.models.requests.findAll({
    
    include:[{
      model: sequelize.models.jobs,
      include:[{
        model: sequelize.models.recruiters,
        attributes: ['company_name','description']
      }]
    }],
    where: {
      candidateId: candidate.id,
    },
   
  });
  return res.status(200).json({ data: request });
});

// Creating a new request
router.post('/', upload.single('cv'), async (req, res) => {
  const { body } = req;

  const candidate = await sequelize.models.candidates.findOne({
    attributes: ['id'],
    where: {
      professionalId: req.user.id,
    },
  });

  const request = await sequelize.models.requests.create({
    candidateId: candidate.id,
    jobId: body.job,
    cv: req.file.path,
    experience: body.experience,
    interest: body.interest,
  });
  await request.save();
  return res.status(201).json({ data: request });
});

// Update a request by id
router.put('/:id', upload.single('cv'),async (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const request = await sequelize.models.requests.findByPk(id);
  if (!request) {
    return res.status(404).json({ code: 404, message: 'request not found' });
  }
  const updatedrequest = await request.update({
    cv: req.file.path,
    experience: body.experience,
    interest: body.interest,
  });
  return res.json({ data: updatedrequest });
});

// // Delete a review by id
// router.delete('/:id', async (req, res) => {
//   const {
//     params: { id },
//   } = req;
//   const review = await sequelize.models.reviews.findByPk(id);
//   if (!review) {
//     return res.status(404).json({ code: 404, message: 'Review not found' });
//   }
//   await review.destroy();
//   return res.json();
// });

module.exports = router;
