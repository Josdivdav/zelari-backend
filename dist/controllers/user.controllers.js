import Account from "../models/Account.model.js";
export const getUserData = async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(404).json({ success: false, error: "User not found" });
    }
    const account = await Account.findOne({ author: user._id });
    return res.status(200).json({ success: true, user, account });
};
export const handleDeposite = async (req, res) => {
    const user = req.user;
    const amount = Number(req.body.amount);
    if (!Number.isFinite(amount) || amount < 100 || amount > 5_000_000) {
        return res.status(400).json({
            success: false,
            error: "Amount must be between ₦100 and ₦5,000,000",
        });
    }
    if (!user) {
        return res.status(404).json({ success: false, error: "Something isn't right" });
    }
    const account = await Account.findOneAndUpdate({ author: user._id }, {
        $inc: { balance: amount },
        $push: {
            transactionHistories: {
                author: user._id,
                type: "money_transfer",
                amount,
                status: "successful",
                reference: `deposit_${Date.now()}`,
                metadata: {
                    method: req.body.method,
                },
            },
        },
    }, { new: true, upsert: true, setDefaultsOnInsert: true });
    return res.status(200).json({
        success: true,
        account,
    });
};
//# sourceMappingURL=user.controllers.js.map