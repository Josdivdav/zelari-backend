import { Router } from "express";
import { getUserData, handleDeposite } from "../controllers/user.controllers.js";
const usersRouter = Router();
usersRouter.get("/", getUserData);
usersRouter.post("/deposit", handleDeposite);
export default usersRouter;
//# sourceMappingURL=users.routes.js.map