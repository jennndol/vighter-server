const User = require('../models/User');
const jwt = require('jsonwebtoken');

const login = (req, res) => {
  User.findOne({
      email: req.body.email
    })
    .then(user => {
      if (user) {
        var token = jwt.sign({
          _id: user._id,
          name: user.name,
          email: user.email
        }, process.env.SECRET_KEY);
        res.status(200).json({
          message: 'success',
          token: token
        });
      } else {  
        User.create({
            name: req.body.name,
            email: req.body.email
          })
          .then(user => {
            var token = jwt.sign({
              _id: user._id,
              name: user.name,
              email: user.email
            }, process.env.SECRET_KEY);
            res.status(200).json({
              message: 'successfully created',
              token: token
            });
          })
          .catch(error => {
            res.status(400).json({
              message: 'bad request'
            });
          });
      }
    })
    .catch(error => {
      res.status(400).json({
        message: 'bad request'
      });
    })
}

module.exports = {
  login
};