import { Router } from "express";
import { SignIn, SignUp } from "../controllers/auth.controllers.js";
import { ValidateAuthBody } from "../middlewares/auth.middlewares.js";

const authRouter = Router();

authRouter.post("/signup", ValidateAuthBody, SignUp);

authRouter.post("/signin", SignIn);


export default authRouter;
