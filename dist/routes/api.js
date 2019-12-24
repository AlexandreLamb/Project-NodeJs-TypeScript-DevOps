"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const { RegisterUser, RegisterPage, LoginUser, LogoutUser, LoginPage } = require('./controllers');
// METRIC IMPORT
const { CreateMetric, ReadMetric, UpdateMetric, DeleteMetric, Index } = require('./controllers');
/**
 * Routes
 */
// AUTH ROUTES
router.post('/register', RegisterUser);
router.post('/login', LoginUser);
router.post('/logout', LogoutUser);
router.get('/login', LoginPage);
router.get('/register', RegisterPage);
// METRICS ROUTES
router.post('/metrics/create', middlewares, CreateMetric);
router.post('/metrics/delete/:id', middlewares, DeleteMetric);
router.get('/metrics/read', middlewares, ReadMetric);
router.post('/metrics/update', middlewares, UpdateMetric);
router.get('/index/metrics/', middlewares, Index);
module.exports = router;
