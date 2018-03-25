const redis = require("redis");
const client = redis.createClient();

client.on("connect", () => {
  console.log('redis connected!');
});

const cache = (req, res, next) => {
  client.get('entertainme_data', (error, reply) => {
    !reply ? next() : res.status(200).json(JSON.parse(reply));
  });
};

module.exports = cache;
