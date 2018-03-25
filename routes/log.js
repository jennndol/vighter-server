const express = require('express');
const router = express.Router();
const LogController = require('../controllers/log');

router.get('/', LogController.findAll);
router.post('/', LogController.add);
router.delete('/:_id', LogController.remove);

module.exports = router;