export const getUserData = async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(404).json({ success: false, error: "User not found" });
    }
    return res.status(200).json({ success: true, user });
};
//# sourceMappingURL=user.controllers.js.map