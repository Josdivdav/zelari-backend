import { Document } from "mongoose";
interface IUser extends Document {
    fullName: string;
    email: string;
    phoneNumber: string;
    createdAt: Date;
    comparePassword(candidate: string): Promise<boolean>;
    password: string;
}
export declare const User: import("mongoose").Model<IUser, {}, {}, {}, Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
export {};
//# sourceMappingURL=User.model.d.ts.map