const express = require('express')
const MainDashboardRouter = express.Router();

MainDashboardRouter.route('/')
    .get(require('./dashboard.view'))

module.exports = MainDashboardRouter