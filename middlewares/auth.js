const jwt = require('jsonwebtoken');
const decode = require('../helpers/decode');

function Auth(req, res, next) {
  decode(req.headers.token)
    .then(payload => {
      if (payload === undefined) {
        res.status(500).json({
          message: 'Token wrong'
        });
      } else {
        next();
      }
    })
    .catch(error => {
      res.send(error.message);
    });
}

module.exports = Auth;