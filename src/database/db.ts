import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "../../.env" });

console.log("MONGODB_URI:", process.env.MONGODB_URI);

export async function connectDB() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/myapp";
  await mongoose.connect(uri);
  console.log("MongoDB connected");
}

connectDB().catch((err) => {
  console.error("Error connecting to MongoDB:", err);
  process.exit(1);
});