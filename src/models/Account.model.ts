import mongoose, { Document, Model, Schema, Types, model } from "mongoose";

export type TransactionType = "airtime_purchase" | "money_transfer";
export type BeneficiaryType = "airtime" | "money_transfer";

export interface ITransaction {
  _id?: Types.ObjectId;
  author: Types.ObjectId;
  type: TransactionType;
  amount: number;
  status: "pending" | "successful" | "failed";
  phoneNumber?: string;
  network?: string;
  recipientName?: string;
  recipientAccountNumber?: string;
  recipientBankCode?: string;
  reference: string;
  metadata?: Record<string, unknown>;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBeneficiary {
  _id?: Types.ObjectId;
  author: Types.ObjectId;
  type: BeneficiaryType;
  name?: string;
  phoneNumber?: string;
  network?: string;
  accountNumber?: string;
  bankCode?: string;
  lastUsedAt?: Date;
}

export interface IAccount extends Document {
  author: Types.ObjectId;
  balance: number;
  currency: string;
  transactionHistories: ITransaction[];
  beneficiaries: IBeneficiary[];
}

const transactionSchema = new Schema<ITransaction>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["airtime_purchase", "money_transfer"],
      required: true,
    },
    amount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "successful", "failed"],
      default: "pending",
    },
    phoneNumber: { type: String, trim: true },
    network: { type: String, trim: true },
    recipientName: { type: String, trim: true },
    recipientAccountNumber: { type: String, trim: true },
    recipientBankCode: { type: String, trim: true },
    reference: { type: String, required: true, trim: true },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true, _id: true },
);

const beneficiarySchema = new Schema<IBeneficiary>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: { type: String, enum: ["airtime", "money_transfer"], required: true },
    name: { type: String, trim: true },
    phoneNumber: { type: String, trim: true },
    network: { type: String, trim: true },
    accountNumber: { type: String, trim: true },
    bankCode: { type: String, trim: true },
    lastUsedAt: { type: Date, default: Date.now },
  },
  { _id: true },
);

const accountSchema = new Schema<IAccount>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    balance: { type: Number, required: true, default: 0, min: 0 },
    currency: {
      type: String,
      required: true,
      default: "NGN",
      uppercase: true,
      trim: true,
    },
    transactionHistories: { type: [transactionSchema], default: [] },
    beneficiaries: { type: [beneficiarySchema], default: [] },
  },
  { timestamps: true },
);

export const Account: Model<IAccount> =
  (mongoose.models.Account as Model<IAccount>) ||
  model<IAccount>("Account", accountSchema);

export default Account;
