const router = require('express').Router();
const apiRouter = require('./api');
const mw = require('./common/middleware');

router.use('/api', mw.validAcceptHeader, mw.validContentTypeHeader, mw.validDbApiToken, mw.validMessage, apiRouter);
router.get('/healthcheck', (req, res) => { res.send('ok'); });

module.exports = router;
