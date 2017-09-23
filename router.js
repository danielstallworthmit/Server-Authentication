const Authentication = require('./controllers/authentication');

module.exports = app => {
    app.get('/', (req, res, next) => {
        res.send(['water', 'phone', 'paper']);
    });

    app.post('/signup', Authentication.signup);
}