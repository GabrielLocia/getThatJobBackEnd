const express = require('express');
const router = express.Router();
const sequelize = require('../db');

// Get all users
router.get('/', async (req, res) => {
    const users = await sequelize.models.professionals.findAll();
    return res.status(200).json({ data: users });
});


router.get('/recruiters', async (req, res) => {
    const users = await sequelize.models.recruiters.findAndCountAll();
    return res.status(200).json({ data: users });
});

router.get('/candidates', async (req, res) => {
    const users = await sequelize.models.candidates.findAndCountAll();
    return res.status(200).json({ data: users });
});
module.exports = router;