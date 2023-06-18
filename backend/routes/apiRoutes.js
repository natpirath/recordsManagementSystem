const express = require('express');
const router = express.Router();
const recordsController = require('../controllers/recordsController');

/**
 * Express router for handling routes related to records.
 */

// Route for getting all records
router.get('/records', recordsController.getAllRecords);

// Route for reloading records
router.get('/reloadRecords', recordsController.reloadRecords);

// Route for getting records by area
router.get('/records/filter', recordsController.filterRecordsByTypeOfProduct);

// Route for persisting data
router.post('/persistRecords', recordsController.persistData);

// // Route for updating a record
// router.put('/records/:id', recordsController.updateRecord);

module.exports = router;
