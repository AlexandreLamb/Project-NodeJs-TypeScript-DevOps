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
const { RegisterUser,LoginUser } = require('./controllers');

// METRIC IMPORT
const { CreateMetric,ReadMetric,UpdateMetric,DeleteMetric } = require('./controllers');

/**
 * Routes
 */
// AUTH ROUTES
router.post('/register', RegisterUser);
router.post('/login', LoginUser);

// METRICS ROUTES
router.post('/metrics/create',middlewares,CreateMetric);
router.delete('/metrics/delete/:id',DeleteMetric);
router.get('/metrics/read',ReadMetric);
router.post('/metrics/update/:id',UpdateMetric);

module.exports = router;
