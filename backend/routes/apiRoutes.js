const express = require('express');
const router = express.Router();
const recordsController = require('../controllers/recordsController');

// Route for getting records
router.get('/records', recordsController.getRecords);

module.exports = router;
