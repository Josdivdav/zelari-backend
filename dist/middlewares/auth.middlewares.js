import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";
dotenv.config({ path: "./.env" });
export const AuthMiddleware = async (req, res, next) => {
    try {
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            return res.status(500).json({ error: "JWT_SECRET not defined" });
        }
        const authHeader = req.headers.authorization;
        const token = authHeader?.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;
        if (!token) {
            return res.status(401).json({ success: false, error: "Authentication token is required" });
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded.id) {
            return res.status(401).json({ success: false, error: "Invalid authentication token" });
        }
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ success: false, error: "User not found" });
        }
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({ success: false, error: "Invalid or expired authentication token" });
    }
};
export const ValidateAuthBody = async (req, res, next) => {
    try {
        const data = req.body;
        req.body.fullName = data.fullName?.trim();
        req.body.email = data.email?.trim().toLowerCase();
        req.body.phoneNumber = data.phoneNumber?.trim();
        req.body.password = data.password?.trim();
        if (!req.body.fullName || !req.body.email || !req.body.phoneNumber || !req.body.password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        // Additional validation can be added here (e.g., email format, password strength)
        next();
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=auth.middlewares.js.map