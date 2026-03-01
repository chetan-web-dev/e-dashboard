const express = require('express');
const router = express.Router();

router.use('/products', require('../../modules/product/v1/product.routes'));
router.use('/users',require('../../modules/user/v1/user.routes'));
router.use('/auth',require('../../modules/auth/v1/auth.routes'));

module.exports = router;