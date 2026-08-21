import { Router } from "express";
import { SignIn, SignUp } from "../controllers/auth.controllers.js";

const authRouter = Router();

authRouter.post("/signup", SignUp);

authRouter.post("/signin", SignIn);

export default authRouter;