import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import { connectDB } from "./database/db.js";
import { User } from "./models/User.model.js";
import { AuthMiddleware } from "./middlewares/auth.middlewares.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRouter);




const PORT = process.env.PORT || 3000;

app.listen(3000, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});