const Log = require('../models/Log');

const findAll = (req, res) => {
  Log.find({user: req.decoded._id})
    .then(payload => {
      res.status(200).json({message: 'successfully get data', payload})
    })
  .catch(error => {
    res.status(400).json({
      message: 'bad request'
    });
  });
}

const add = (req, res) => {
  Log.create({
    type: req.body.type,
    power: req.body.power,
    status: req.body.status,
    user: req.decoded._id
  })
  .then(payload => {
    res.status(200).json({message: 'successfully created', payload})
  })
  .catch(error => {
    res.status(400).json({
      message: 'bad request'
    });
  });
}

const remove = (req, res) => {
  Log.deleteOne({_id: req.params._id})
    .then(payload => {
      res.status(200).json(payload);
    })
    .catch(error => {
      res.status(400).json({
        message: 'bad request'
      });
    });
}

module.exports = {add, remove, findAll};