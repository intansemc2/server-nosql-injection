//Import liblaries
const express = require('express');
const router = express.Router();

//Import controller
const injectionController = require('../controllers/injection.controller');

//Tautology
//Login
router.get('/tautology/login', injectionController.tautology.login);
router.get('/tautology/resolved_login', injectionController.tautology.resolve_login);
router.get('/tautology/register', injectionController.tautology.register);
router.get('/tautology/resolved_register', injectionController.tautology.register);

//Module export
module.exports = router;
