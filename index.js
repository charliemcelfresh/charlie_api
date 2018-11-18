global.__base = `${__dirname}/`;

const config = require(`${__base}config`);
const express = require('express');
const bodyParser = require('body-parser');

const routes = require(`${__base}routes`);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json({ type: config.get('jsonApiOrgString') }));
app.use(routes);

const port = config.get('port');

app.listen(port, () => {
  console.log(`hermes listening on port ${port}`);
});

module.exports = app;
