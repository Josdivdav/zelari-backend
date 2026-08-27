import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

async function emailExists(email: string): Promise<boolean> {
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    return !!user;
}

export const SignUp = async (req: any, res: any, next: any) => {
    try {
        const data = req.body;
        /* Process/Validate data then create or reject user */
        const JWT_SECRET = process.env.JWT_SECRET;
        if(!JWT_SECRET) {
            return res.status(500).json({ error: "JWT_SECRET not defined" });
        }

        if(await emailExists(data.email)) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const user = await User.create(data);
        
        jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" }, (err, token) => {
            if (err) {
                return res.status(500).json({ error: "Error signing token" });
            }
            res.json({ user, token });
        });
    } catch (error: any) {
        if(error.code == 11000) {
            console.log("User exists");
            res.status(500).json({ success: false, error: "User exists" });
        }
        res.status(500).json({success: false, error: error});
    }
}

export const SignIn = async (req: any, res: any) => {
    try {
        const data = req.body;
        console.log(data);
        
    } catch (err : any) {
        console.log(err);
        
    }
}  