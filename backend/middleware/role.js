const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Niste prijavljeni" });
        }
        
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: "Nemate pravo pristupa ovoj ruti" });
        }
        
        next();
    };
};

module.exports = { authorizeRoles };