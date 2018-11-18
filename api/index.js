const router = require('express').Router();
const V1Router = require('./v1');

router.use('/v1', V1Router);

module.exports = router;
