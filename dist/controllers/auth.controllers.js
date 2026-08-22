import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
export const SignUp = async (req, res, next) => {
    try {
        const data = req.body;
        /* Process/Validate data then create or reject user */
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            return res.status(500).json({ error: "JWT_SECRET not defined" });
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
            res.status(500).json({ success: false, error: "User exists" });
        }
        res.status(500).json({ success: false, error: error });
    }
};
export const SignIn = async (req, res) => {
    res.json({ result: "Signed In" });
};
//# sourceMappingURL=auth.controllers.js.map