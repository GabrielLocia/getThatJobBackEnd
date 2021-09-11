const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authentication');

router.use('/auth', require('./auth'));
router.use('/jobs', authenticate, require('./jobs'));
router.use('/candidates', authenticate, require('./candidates'));
router.use('/recruiters', authenticate, require('./recruiters'));
router.use('/requests', authenticate, require('./requests'));
router.use('/users', require('./users'));

module.exports = router;
