import type { Request, Response } from "express";
import type { Types } from "mongoose";
import { randomUUID } from "node:crypto";
import Account from "../models/Account.model.js";

interface AuthenticatedRequest extends Request {
  user?: { _id: Types.ObjectId };
  account?: any;
}

export const getUserData = async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.status(404).json({ success: false, error: "User not found" });
  }
  const account = await Account.findOne({ author: user._id });

  return res.status(200).json({ success: true, user, account });
};

export const handleDeposite = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const user = req.user;
  const amount = Number(req.body.amount);

  if (!Number.isFinite(amount) || amount < 100 || amount > 5_000_000) {
    return res.status(400).json({
      success: false,
      error: "Amount must be between ₦100 and ₦5,000,000",
    });
  }

  if (!user) {
    return res
      .status(404)
      .json({ success: false, error: "Something isn't right" });
  }

  const account = await Account.findOneAndUpdate(
    { author: user._id },
    {
      $inc: { balance: amount },
      $push: {
        transactionHistories: {
          author: user._id,
          type: "money_deposite",
          amount,
          status: "successful",
          reference: `deposit_${Date.now()}`,
          metadata: {
            method: req.body.method,
          },
        },
      },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true },
  );

  return res.status(200).json({
    success: true,
    account,
  });
};

export const handleTransfer = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const user = req.user;
  const amount = Number(req.body.amount);

  if (!Number.isInteger(amount) || amount < 100 || amount > 5_000_000) {
    return res.status(400).json({
      success: false,
      error: "Amount must be between ₦100 and ₦5,000,000",
    });
  }

  if (!user) {
    return res
      .status(404)
      .json({ success: false, error: "Something isn't right" });
  }

  const bank = typeof req.body.bank === "string" ? req.body.bank.trim() : "";
  const accountNumber =
    typeof req.body.accountNumber === "string"
      ? req.body.accountNumber.trim()
      : "";
  const recipientName =
    typeof req.body.recipientName === "string"
      ? req.body.recipientName.trim()
      : "";
  const note = typeof req.body.note === "string" ? req.body.note.trim() : "";

  if (!bank || !/^\d{10}$/.test(accountNumber) || !recipientName) {
    return res.status(400).json({
      success: false,
      error:
        "Bank, a valid 10-digit account number, and recipient name are required",
    });
  }

  if (note.length > 140) {
    return res
      .status(400)
      .json({ success: false, error: "Note must be 140 characters or fewer" });
  }

  const fee = 10;
  const totalDebit = amount + fee;
  const reference = `transfer_${randomUUID()}`;
  const account = await Account.findOneAndUpdate(
    { author: user._id, balance: { $gte: totalDebit } },
    {
      $inc: { balance: -totalDebit },
      $push: {
        transactionHistories: {
          author: user._id,
          type: "money_transfer",
          amount,
          status: "pending",
          recipientName,
          recipientAccountNumber: accountNumber,
          reference,
          metadata: { bank, fee, note },
        },
      },
    },
    { new: true, runValidators: true },
  );

  if (!account) {
    const accountExists = await Account.exists({ author: user._id });
    return res.status(accountExists ? 400 : 404).json({
      success: false,
      error: accountExists
        ? "Insufficient balance to cover the transfer and fee"
        : "Account not found",
    });
  }

  return res.status(202).json({
    success: true,
    message: "Transfer queued for processing",
    reference,
    status: "pending",
    account,
  });
};
