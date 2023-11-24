const jwt = require("jsonwebtoken");
exports.requireAuth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/auth/login');
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            // Redirect to login if token is invalid
            return res.redirect('/auth/login');
        }

        req.user = decoded;
        next();
    });
};
