import type { Request, Response } from "express";
interface AuthenticatedRequest extends Request {
    user?: unknown;
}
export declare const getUserData: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export {};
//# sourceMappingURL=user.controllers.d.ts.map