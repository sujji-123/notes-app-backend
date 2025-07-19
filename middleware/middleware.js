import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import dotenv from 'dotenv'
dotenv.config()

const middleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        let decoded;
        try {
            // eslint-disable-next-line no-undef
            decoded = jwt.verify(token,process.env.JWT_TOKEN);
        } catch (err) {
            return res.status(401).json({ success: false, message: "Invalid or expired token" });
        }

        if (!decoded || !decoded.id) {
            return res.status(401).json({ success: false, message: "Wrong token" });
        }

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ success: false, message: "No user" });
        }

        req.user = { name: user.name, id: user._id };
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "please login" });
    }
}

export default middleware