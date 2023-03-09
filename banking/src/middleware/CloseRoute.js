const closeRoute = async (req, res, next) => res.status(503).json({ success: false, message: 'This route is currently unavailable.' });

export default closeRoute;
