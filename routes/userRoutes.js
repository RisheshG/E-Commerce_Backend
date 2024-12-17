const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 
const router = express.Router();


const JWT_SECRET = 'your_secret_key';


router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        // Generate a token
        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt:', { email, password });

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found:', email);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Fetched user:', user);
        console.log('Input password:', password);
        console.log('Stored hashed password:', user.password);
        console.log('Password match result:', isMatch);

        if (!isMatch) {
            console.log('Password mismatch for user:', email);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        console.log('Login successful for user:', email);
        
        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Error logging in user', error });
    }
});



module.exports = router;
