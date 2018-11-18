const config = require(`${__base}config`);
const db = require(`${__base}db`);
const httpErrors = require(`${__base}common/httpErrors`);

const jsonApiOrgString = config.get('jsonApiOrgString');

const validAcceptHeader = async (req, res) => {
  try {
    if (req.headers.accept !== jsonApiOrgString) {
      throw new Error('invalid_accept_header');
    }
  } catch (e) {
    res.status(406).send(httpErrors.missingOrInvalidJsonApiHeader('Accept'));
  }
};

const validContentTypeHeader = async (req, res) => {
  try {
    if (req.headers['content-type'] !== jsonApiOrgString) {
      throw new Error('invalid_content_type_header');
    }
  } catch (e) {
    res.status(406).send(httpErrors.missingOrInvalidJsonApiHeader('Content-Type'));
  }
};

const validDbApiToken = async (req, res, next) => {
  try {
    const { rows } = await db.query('SELECT * FROM api_tokens WHERE token = $1 LIMIT 1', [res.locals.validApiToken]);
    const apiToken = rows[0];
    if (!apiToken) {
      throw new Error('not_found');
    } else if (apiToken.revoked) {
      throw new Error('api_token_revoked');
    }
    next();
  } catch (e) {
    console.log(e);
    if (e.message === 'not_found') {
      res.status(401).send(httpErrors.missingOrInvalidAuthHeader());
    } else if (e.message === 'api_token_revoked') {
      res.status(403).send(httpErrors.revokedToken());
    } else {
      res.status(400).send(httpErrors.badRequest());
    }
  }
};

const validMessage = async (req, res, next) => {
  try {
    if (req.body && req.body.data && req.body.data.type && req.body.data.type === 'events' && req.body.data.attributes) {
      next();
    } else {
      throw new Error('invalidMessage');
    }
  } catch (e) {
    console.log('here');
    res.status(400).send(httpErrors.badRequest(JSON.stringify(req.body)));
  }
};

module.exports = {
  validAcceptHeader,
  validContentTypeHeader,
  validDbApiToken,
  validMessage,
};
