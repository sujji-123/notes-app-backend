import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import middleware from '../middleware/middleware.js'

const authrouter = express.Router()

authrouter.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        const token = jwt.sign({ id: user._id }, "secretkeyofnoteapp123@#");
        return res.status(200).json({ success: true, token, user: { name: user.name, email: user.email }, message: "Account Created Successfully" });
    } catch (error) {
        console.error("User registration error:", error);
        return res.status(500).json({ success: false, message: "Error in adding user" });
    }
});

authrouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "User Not exists" });
        }
        const checkpassword = await bcrypt.compare(password, user.password);
        if (!checkpassword) {
            return res.status(401).json({ success: false, message: "Wrong Credentials" });
        }
        const token = jwt.sign({ id: user._id }, "secretkeyofnoteapp123@#", { expiresIn: "5h" });
        return res.status(200).json({ success: true, token, user: { name: user.name, email: user.email }, message: "Login Successful" });
    } catch (error) {
        console.error("User login error:", error);
        return res.status(500).json({ success: false, message: "Error in login server" });
    }
});

authrouter.get('/verify', middleware, async (req, res) => {
    return res.status(200).json({ success: true, user: req.user });
});

export default authrouter