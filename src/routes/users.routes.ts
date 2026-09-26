import { Router } from "express";
import {
    getUserData,
    handleDeposite,
    handleTransfer,
} from "../controllers/user.controllers.js";

const usersRouter = Router();

usersRouter.get("/", getUserData);

usersRouter.post("/deposit", handleDeposite);
usersRouter.post("/transfer", handleTransfer);

export default usersRouter;
