import User from '../models/User.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' })
        }

        const user = await User.create({ email, password })
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: '1h'})
    
        res.status(201).json({ token, message: 'User registered' })
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message })
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credential"})
        }
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.json({ token })
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message })
    }
};