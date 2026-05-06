export const protect = async (req, res, next) => {
    try {
        const auth = req.auth();

        if (!auth || !auth.userId) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated'
            });
        }

        req.userId = auth.userId;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};