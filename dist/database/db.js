import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config({ path: "./.env" });
export async function connectDB() {
    console.log("Connecting to mongoDB...");
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error("MONGODB_URI is not defined in the environment variables.");
        }
        await mongoose.connect(uri);
        console.log("MongoDB connected");
    }
    catch (err) {
        console.error("MongoDB connection failed:", err.message);
        throw err;
    }
}
//# sourceMappingURL=db.js.map