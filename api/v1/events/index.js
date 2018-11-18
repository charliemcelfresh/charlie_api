const router = require('express').Router();
const Events = require('./events');

router.post('/', Events.create);

module.exports = router;
