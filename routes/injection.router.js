//Import liblaries
const express = require('express');
const router = express.Router();

//Import controller
const injectionController = require('../controllers/injection.controller');

//Router for Login Page
router.get('/login_bypass/login', injectionController.loginBypassLogin);
router.get('/login_bypass/resolve_login', injectionController.loginBypassResolveLogin);

//Router for Login ByPass
router.get('/api/login_bypass/auth', injectionController.loginBypassAPIAuth);
router.get('/login_bypass/auth', injectionController.loginBypassAuth);

//Router for Resolve Login ByPass
router.get('/api/login_bypass/resolve_auth');
router.get('/login_bypass/resolve_auth');

//Module export
module.exports = router;
