// authMiddleware.js

const jwt = require("jsonwebtoken");
exports.requireAuth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        // Redirect to login if no token is present
        return res.redirect('/auth/login');
    }

    // Verify the token and extract user information
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            // Redirect to login if token is invalid
            return res.redirect('/auth/login');
        }

        // Attach user information to the request object
        req.user = decoded;
        next();
    });
};
