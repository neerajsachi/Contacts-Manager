const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(401).json({ error: "Unauthorized" });
            req.user = user;
            next();
        });
    } else {
        return res.status(403).json({ error: "Forbidden" });
    }
}

module.exports = authenticateToken;
