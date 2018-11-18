const amqp = require('amqplib');

const config = require(`${__base}config`);

const amqpConnectionString = config.get('amqpConnectionString');

const client = async () => {
  const connection = await amqp.connect(amqpConnectionString);
  const channel = await connection.createChannel();
  channel.assertQueue('events', { durable: false });
  return channel;
};

module.exports = {
  client,
};
