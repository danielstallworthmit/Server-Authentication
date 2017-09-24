const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create Local Strategy for signin
const LocalOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(LocalOptions, (email, password, done) => {
    // Verify email
    // Call done
    // If no user call done with no user
    User.findOne({ email }, (err, user) => {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        // If password matches return the user
        user.comparePassword(password, (err, isMatch) => {
            if (err) { return done(err); }
            if (!isMatch) { return done(null, false); }
            return done(null, user);
        });
    });
});

// Set up jwt options
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    // User exists in DB already?
    // Call done
    // If not exist, call done without user
    User.findById(payload.sub, (err, user) => {
        if (err) { return done(err, false); }
        if (user) {
            done(null, user);
        } else {
            done(null, false)
        }
    });
});

// Use the strategy
passport.use(jwtLogin);
passport.use(localLogin);