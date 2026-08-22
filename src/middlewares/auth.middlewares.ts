
export const AuthMiddleware = async (req: any, res: any, next: any) => {
    try {
        const data = req.body;
        
        req.body.fullName = data.fullName?.trim();
        req.body.email = data.email?.trim().toLowerCase();
        req.body.phoneNumber = data.phoneNumber?.trim();
        req.body.password = data.password?.trim();

        if (!req.body.fullName || !req.body.email || !req.body.phoneNumber || !req.body.password) {
            return res.status(400).json({ error: "All fields are required" });
        }


        // Additional validation can be added here (e.g., email format, password strength)

        next();
    } catch (error) {
        next(error);
    }
}