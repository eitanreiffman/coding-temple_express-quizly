const MainAuthRouter = require('express').Router();

MainAuthRouter.route('/register')
    .get((request, response) => {
        response.render('register')
    })
    .post((request, response) => {
        response.send('Post Auth Router Register')
    })

MainAuthRouter.route('/login')
    .get((request, response) => {
        response.render('login')
    })

    .post((request, response) => {
        response.send('Post Auth Router Register')
    })

module.exports = MainAuthRouter