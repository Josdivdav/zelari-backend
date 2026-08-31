import { Router } from "express";
import { getUserData } from "../controllers/user.controllers.js";

const usersRouter = Router();

usersRouter.post("/get-data", getUserData);

export default usersRouter;
