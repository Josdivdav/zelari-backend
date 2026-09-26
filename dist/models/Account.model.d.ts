import { Document, Model, Types } from "mongoose";
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
export declare const Account: Model<IAccount>;
export default Account;
//# sourceMappingURL=Account.model.d.ts.map