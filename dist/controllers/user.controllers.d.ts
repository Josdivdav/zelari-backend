import type { Request, Response } from "express";
import type { Types } from "mongoose";
interface AuthenticatedRequest extends Request {
    user?: {
        _id: Types.ObjectId;
    };
    account?: any;
}
export declare const getUserData: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const handleDeposite: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export {};
//# sourceMappingURL=user.controllers.d.ts.map