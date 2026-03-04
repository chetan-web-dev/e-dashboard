const express = require('express');
const router = express.Router();
const controller = require('./auth.controller');

router.post(
    '/login', 
    controller.login
);

router.post(
    '/logout',
    controller.logout
);

router.post(
    '/refreshToken',
    controller.refreshToken
);

router.put(
    '/update/profile/:id', 
    controller.updateProfile
);

module.exports = router;