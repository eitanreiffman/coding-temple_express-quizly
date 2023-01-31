const express = require('express')
const MainAuthRouter = express.Router();

// We just created a sort of "Mini App" within our app, which will control certain routes
// And then later pass those routes back into the Main App
// In this case, the our "MainAuthRouter" is controlling all routes concerned with "Auth"

MainAuthRouter.route('/register')
    .get((req, res) => {
        res.render('register')
    })
    .post((req, res) => {
        res.send('Post Auth Router Register')
    })

MainAuthRouter.route('/login')
    .get((req, res) => {
        res.render('login')
    })

    .post((req, res) => {
        res.send('Post Auth Router Register')
    })

module.exports = MainAuthRouter