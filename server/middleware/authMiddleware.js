const jwt = require('jsonwebtoken');
const JWT_SECRET = 'sOKkbeZJIbQLszWtjCheHh981SIaCRQG';
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Authentication token required' });
    console.log(token);

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error.message);
        res.status(403).json({ error: 'Invalid token' });
    }
};

module.exports = { authenticate };