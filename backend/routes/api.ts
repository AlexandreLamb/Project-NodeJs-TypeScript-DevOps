const { Router } = require('express');

const router = Router();

/**
 * Middlewares imports
 */

// MIDDLEWARES
const { middlewares } = require('../middlewares');

/**
 * Controllers imports
 */

// AUTH IMPORT
const { RegisterUser,LoginUser,LogoutUser } = require('./controllers');

// METRIC IMPORT
const { CreateMetric,ReadMetric,UpdateMetric,DeleteMetric } = require('./controllers');

/**
 * Routes
 */
// AUTH ROUTES
router.post('/register', RegisterUser);
router.post('/login', LoginUser);
router.post('/logout',LogoutUser);

// METRICS ROUTES
router.post('/metrics/create',middlewares,CreateMetric);
router.delete('/metrics/delete/:id',middlewares,DeleteMetric);
router.get('/metrics/read',middlewares,ReadMetric);
router.post('/metrics/update/:id',middlewares,UpdateMetric);

module.exports = router;
