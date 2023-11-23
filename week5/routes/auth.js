const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth');
const authMiddleware = require('../controllers/authMiddleware');

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/logout', authController.logout);


router.get('/profile', authMiddleware.requireAuth, (req, res) => {
    // Render the profile page only if the user is authenticated
    const token = req.cookies.token;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/auth/login'); // Redirect to login if token is invalid
            } else {
                const user = decodedToken.user;
                res.render('profile', {
                    user: user,
                    token: token
                });
            }
        });
    } else {
        res.redirect('/auth/login'); // Redirect to login if no token is present
    }
});

module.exports = router;