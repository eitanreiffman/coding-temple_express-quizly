const express = require('express')
const MainAuthRouter = express.Router();

// We just created a sort of "Mini App" within our app, which will control certain routes
// And then later pass those routes back into the Main App
// In this case, the our "MainAuthRouter" is controlling all routes concerned with "Auth"

MainAuthRouter.route('/register')
    .get(require('./register.view'))
    .post(require('./register'))


MainAuthRouter.route('/login')
    .get(require('./login.view'))
    .post(require('./login'))


MainAuthRouter.route('/logout')
    .get(require('./logout'))

module.exports = MainAuthRouter