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
        console.log("Connection failed!");
    }
}
//# sourceMappingURL=db.js.map