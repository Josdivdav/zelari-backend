import type { Request, Response } from "express";
import type { Types } from "mongoose";
import Account from "../models/Account.model.js";

interface AuthenticatedRequest extends Request {
  user?: { _id: Types.ObjectId };
}

export const getUserData = async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.status(404).json({ success: false, error: "User not found" });
  }

  const account = await Account.findOne({ author: user._id });

  return res.status(200).json({ success: true, user, account });
};
