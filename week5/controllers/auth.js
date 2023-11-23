const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.register = (req,res)=>{
    console.log(req.body);

    const {name, email, password, passwordConfirm} = req.body;
    db.query('SELECT email FROM users WHERE email = ?', {email}, async (error, result)=>{
        if (error) {
            console.log(error);
        }
        if (result.length > 0) {
            return res.render('register'), {
                message: 'This email is already in use...'
            }
        }else if (password !== passwordConfirm) {
            return res.render('register',{
                message: 'Passwords do not match'
            });
        }
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO users SET ?', {name: name, email: email, password: hashedPassword}, (error, result)=> {
            if (error) {
                console.log(error)
            }
            else {
                console.log(result);
                return res.render('register', {
                    message: 'User Registered!'
                });
            }
        });


    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async (error, result) => {
        if (error) {
            console.log(error);
            res.render('login', {
                message: 'An error occurred while attempting to log in.'
            });
        } else if (result.length === 0) {
            console.log(result);
            res.render('login', {
                message: 'Invalid email or password'
            });
        } else {
            const user = result[0];
            const isValidPassword = await bcrypt.compare(password, user.password);

            console.log('Input Password:', password);
            console.log('Stored Password:', user.password);

            if (isValidPassword) {
                const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
                    expiresIn: '1h'
                });

                res.cookie('token', token, { httpOnly: true });

                res.render('profile', {
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    },
                    token: token
                });

            } else {
                console.log(user);
                console.log(user.password);
                res.render('login', {
                    message: 'Invalid email or password!'
                });
            }
        }
    });
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
}
