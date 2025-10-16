const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Existing routes
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);

// New login route (alias for signin)
router.post('/login', userController.signin);

module.exports = router;
