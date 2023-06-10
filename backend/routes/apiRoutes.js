const express = require('express');
const router = express.Router();
const recordsController = require('../controllers/recordsController');

// GET all records
router.get('/records', recordsController.getRecords);

// GET a single record by ID
router.get('/records/:id', recordsController.displayRecord);

// GET multiple records within a range
router.get('/records', recordsController.displayRecords);

// POST create a new record
router.post('/records', recordsController.createRecord);

// PUT edit an existing record
router.put('/records/:id', recordsController.editRecord);

// DELETE delete a record
router.delete('/records/:id', recordsController.deleteRecord);

// POST reload the data from the dataset
router.post('/records/reload', recordsController.reloadRecords);

// POST save records to file
router.post('/records/save', recordsController.saveRecords);

module.exports = router;
