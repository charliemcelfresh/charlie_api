const router = require('express').Router();
const EventsRouter = require('./events');

router.use('/events', EventsRouter);

module.exports = router;
