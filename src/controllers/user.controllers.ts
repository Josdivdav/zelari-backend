import type { Request, Response } from "express";

interface AuthenticatedRequest extends Request {
  user?: unknown;
}

export const getUserData = async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user;

  if (!user) {
    return res.status(404).json({ success: false, error: "User not found" });
  }

  

  return res.status(200).json({ success: true, user });
};
