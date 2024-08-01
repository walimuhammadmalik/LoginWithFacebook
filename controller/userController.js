// controllers/userController.js
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const user = await User.create({ name, email, password });
        const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
        return res.status(201).json({ token });
    } catch (error) {
        return res.status(500).json({ error: 'Error registering user' });
    }
};

const loginUser = (req, res) => {
    const token = jwt.sign({ id: req.user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    return res.json({ token });
};

const verifyUser = async (req, res) => {
    try {
        const user = await User.findOne({ where: { verificationToken: req.params.token } });
        if (!user) {
            return res.status(400).json({ error: 'Invalid token' });
        }
        user.verificationToken = null;
        await user.save();
        return res.json({ message: 'User verified successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Error verifying user' });
    }
};

module.exports = { registerUser, loginUser, verifyUser };
