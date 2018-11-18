const convict = require('convict');

const config = convict({
  queueName: {
    doc: 'The queue where all events are pushed',
    default: 'events',
  },
  amqpConnectionString: {
    doc: 'AMQP connection string',
    format: 'String',
    default: 'fake',
    env: 'AMQP_CONNECTION_STRING',
  },
  jsonApiOrgString: {
    doc: 'The request string required by jsonapi.org in Accept and Content-Type headers',
    format: 'String',
    default: 'application/vnd.api+json',
  },
  env: {
    doc: 'The application environment.',
    format: ['rendertoken', 'rndrstaging', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 9999,
    arg: 'port',
    env: 'NODE_PORT',
  },
  dbUrl: {
    doc: 'Postgres database url',
    format: 'String',
    default: 'this.should.fail',
  },
});

// Load environment dependent configuration
const env = config.get('env');
config.loadFile(`./config/${env}.json`);

config.validate({ allowed: 'strict' });

module.exports = config;
