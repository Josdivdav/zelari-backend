import { Router, type Request, type Response } from "express";

interface AuthenticatedRequest extends Request {
  user?: any;
}

const usersRouter = Router();

usersRouter.get("/", (req: AuthenticatedRequest, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.status(404).json({ success: false, error: "User not found" });
  }

  console.log("User from middleware:", user);
  return res.send({ success: true, message: "Users route works!", user });
});

export default usersRouter;
