import mongoose, { Document, Model, Schema, Types, model } from "mongoose";
const transactionSchema = new Schema({
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
}, { timestamps: true, _id: true });
const beneficiarySchema = new Schema({
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
}, { _id: true });
const accountSchema = new Schema({
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
}, { timestamps: true });
export const Account = mongoose.models.Account ||
    model("Account", accountSchema);
export default Account;
//# sourceMappingURL=Account.model.js.map