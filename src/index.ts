import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import { connectDB } from "./database/db.js";
import { AuthMiddleware } from "./middlewares/auth.middlewares.js";
import usersRouter from "./routes/users.routes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({ success: true, message: "Zelari API is running" });
});

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/users", AuthMiddleware, usersRouter);




const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(() => {
    process.exit(1);
  });
