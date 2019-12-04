"use strict";
const { Router } = require('express');
const router = Router();
/**
 * Middlewares imports
 */
// MIDDLEWARES
const { middleware } = require('../middlewares');
/**
 * Controllers imports
 */
// AUTH IMPORT
const { RegisterUser, LoginUser } = require('./controllers');
// METRIC IMPORT
const { CreateMetric } = require('./controllers');
/**
 * Routes
 */
// AUTH ROUTES
router.post('/register', RegisterUser);
router.post('/login', LoginUser);
// METRICS ROUTES
router.post('/metrics/create', CreateMetric);
module.exports = router;
