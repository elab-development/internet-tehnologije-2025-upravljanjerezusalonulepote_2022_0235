const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "tajni_kljuc";
const protect = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ success: false, error: "Niste autentifikovani" });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ success: false, error: "Token nije validan" });
        }
        req.user = user;
        next();
    });
};

const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: "Nemate pravo pristupa" });
        }
        next();
    };
};

module.exports = { protect, authorize };