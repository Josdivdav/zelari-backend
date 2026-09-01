import { Router } from "express";
import { getUserData } from "../controllers/user.controllers.js";

const usersRouter = Router();

usersRouter.get("/", getUserData);

export default usersRouter;
