// routes/userRouter.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifyUser } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verifyUser/:token', verifyUser);

module.exports = router;
