import { Router } from "express";
import { getUserData } from "../controllers/user.controllers.js";
const usersRouter = Router();
usersRouter.get("/get-data", getUserData);
export default usersRouter;
//# sourceMappingURL=users.routes.js.map