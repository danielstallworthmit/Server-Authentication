const User = require('../models/user');

exports.signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(422).send({ error: 'Please provide email and password' });
    }

    // See if use with given email exists
    User.findOne({ email }, (err, existingUser) => {
        if (err) { return next(err); }
        // If user already exists, return 422 error
        if (existingUser) { 
            return res.status(422).send({ error: 'Email already registered. Try signing in.'});
        }
        // If new user, create and save user
        const user = new User({
            email, password
        });
        user.save(err => {
            if (err) { return next(err); }
            // No error, return response
            res.json({ success: true });
        });
    });
    // res.send({ success: 'true' });
}