import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./src/routes/auth.routes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
  res.json({ result: "Connected!" });
});

const PORT = process.env.PORT || 3000;

app.listen(3000, () => console.log(`Server running on port ${PORT}`));