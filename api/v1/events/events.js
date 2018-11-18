const config = require(`${__base}config`);
const { amqp } = require(`${__base}common`);
const queueName = config.get('queueName');

async function create(req, res) {
  res.status(201).send();
  const ch = await amqp.client();
  try {
    ch.sendToQueue(queueName, Buffer.from(JSON.stringify(req.body)));
    res.status(201).send();
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  create,
};
