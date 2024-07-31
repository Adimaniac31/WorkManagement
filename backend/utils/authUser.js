export const authUser = (req, res, next) => {

    const { userId } = req.params;
    try {
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        if (req.userId !== parseInt(userId)) {
            return res.status(403).json({ error: 'You are not authorized to do operations on this user' });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Authentication failed!!!' });
    }
    next();
}