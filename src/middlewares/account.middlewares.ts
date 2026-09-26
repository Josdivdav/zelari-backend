import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import Account from "../models/Account.model.js";

dotenv.config({ path: "./.env" });

export const PaymentMiddleware = async (req: any, res: any, next: any) => {
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

        const decoded = jwt.verify(token, JWT_SECRET) as { id?: string };
        if (!decoded.id) {
            return res.status(401).json({ success: false, error: "Invalid authentication token" });
        }

        const account = await Account.findOne({ author: req.user._id });

        req.account = account;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, error: "Invalid or expired authentication token" });
    }
}