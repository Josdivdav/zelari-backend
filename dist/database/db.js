import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config({ path: "./.env" });
export async function connectDB() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error("MONGODB_URI is not defined in the environment variables.");
    }
    await mongoose.connect(uri);
    console.log("MongoDB connected");
}
//# sourceMappingURL=db.js.map