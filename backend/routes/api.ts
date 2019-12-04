const { Router } = require('express');

const router = Router();

/**
 * Middlewares imports
 */

// MIDDLEWARES
//const { middleware } = require('../middlewares');

/**
 * Controllers imports
 */

// AUTH IMPORT
const { RegisterUser } = require('./controllers');

/**
 * Routes
 */
// AUTH ROUTES
router.post('/register', RegisterUser);

module.exports = router;
