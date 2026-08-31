import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
async function emailExists(email) {
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    return user;
}
export const SignUp = async (req, res, next) => {
    try {
        const data = req.body;
        /* Process/Validate data then create or reject user */
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            return res.status(500).json({ error: "JWT_SECRET not defined" });
        }
        if (await emailExists(data.email)) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const user = await User.create(data);
        jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" }, (err, token) => {
            if (err) {
                return res.status(500).json({ error: "Error signing token" });
            }
            res.json({ user, token });
        });
    }
    catch (error) {
        if (error.code == 11000) {
            console.log("User exists");
            return res.status(409).json({ success: false, error: "User exists" });
        }
        return res.status(500).json({ success: false, error: error.message || "Signup failed" });
    }
};
export const SignIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, error: "Email and password are required" });
        }
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            return res.status(500).json({ error: "JWT_SECRET not defined" });
        }
        const user = await emailExists(email);
        if (!user)
            return res.status(404).json({ success: false, message: "User not found" });
        const passwordMatches = await user.comparePassword(password);
        if (!passwordMatches) {
            return res.status(401).json({ success: false, error: "Invalid email or password" });
        }
        jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" }, (err, token) => {
            if (err) {
                return res.status(500).json({ error: "Error signing token" });
            }
            res.status(200).json({ success: true, user, token });
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err.message || "Signin failed" });
    }
};
//# sourceMappingURL=auth.controllers.js.map