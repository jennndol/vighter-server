const jwt = require('jsonwebtoken');

const decode = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (!err) {
          resolve(decoded)
        } else {
          reject(err)
        }
      });
  });
}

module.exports = decode;