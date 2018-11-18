const config = require(`${__base}config`);

const jsonApiOrgString = config.get('jsonApiOrgString');

const error = (status, title, detail) => ({
  errors: [
    {
      status,
      title,
      detail,
    },
  ],
});

const missingOrInvalidJsonApiHeader = headerType => error('406', 'Not Acceptable', `Request ${headerType} header must equal ${jsonApiOrgString}`);

const missingOrInvalidAuthHeader = () => error('401', 'Unauthorized', 'Invalid access token');

const revokedToken = () => error('403', 'Forbidden', 'Token was revoked');

const badRequest = requestBody => error('400', 'Bad Request', `Request is malformed: ${requestBody}`);

module.exports = {
  missingOrInvalidJsonApiHeader,
  missingOrInvalidAuthHeader,
  revokedToken,
  badRequest,
};
