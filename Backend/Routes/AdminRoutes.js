const express = require('express');
const { registeradmin, loginadmin } = require('../controllers/adminControllers');
const router = express.Router();

router.post('/register', registeradmin);
router.post('/login', loginadmin);

module.exports = router;
