const express = require('express');
const router = express.Router();
const sequelize = require('../db');

// Get candidate
router.get('/', async (req, res) => {
  // const candidate = await sequelize.models.candidates.findAndCountAll();
  const candidate = await sequelize.models.candidates.findOne({
    where: { professionalId: req.user.id },
    include: [
      {
        attributes: {
          exclude: ['password'],
        },
        model: sequelize.models.professionals,
        where: { id: req.user.id },
      },
    ],
  });

  
  return res.status(200).json({ data: candidate });
});
//get professional email
router.get('/professional', async (req, res) => {
  // const candidate = await sequelize.models.candidates.findAndCountAll();
  const email = await sequelize.models.professionals.findOne({
    where: { id: req.user.id },
    attributes: {
      exclude: ['password','type','id','createdAt','updatedAt'],
    },
  });
  return res.status(200).json({ data: email });
});

// Creating a new candidate
router.post('/', async (req, res) => {
  const { body } = req;
  let candidate = await sequelize.models.candidates.findOne({
    where: { professionalId: req.user.id },
  });
  if (!candidate) {
    console.log("crear nuevo")
    candidate = await sequelize.models.candidates.create({
      professionalId: req.user.id,
      fullname: body.fullname,
      phone: body.phone,
      description: body.description,
      experience: body.experience,
      linkdinurl: body.linkdinurl,
      githuburl: body.githuburl,
    });
    await candidate.save();
    return res.status(201).json({ data: candidate });
  } else {
    console.log("actualizar")
    const updatecandidate = await candidate.update({
      professionalId: req.user.id,
      fullname: body.fullname,
      phone: body.phone,
      description: body.description,
      experience: body.experience,
      linkdinurl: body.linkdinurl,
      githuburl: body.githuburl,
    });
    return res.status(201).json({ data: updatecandidate });
  }
});

// // Update a review by id
// router.put('/:id', async (req, res) => {
//   const {
//     body,
//     params: { id },
//   } = req;
//   const review = await sequelize.models.reviews.findByPk(id);
//   if (!review) {
//     return res.status(404).json({ code: 404, message: 'Review not found' });
//   }
//   const updatedReview = await review.update({
//     content: body.content,
//   });
//   return res.json({ data: updatedReview });
// });

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
