const fs = require('fs');
const path = require('path');

let records = [];

/**
 * This is a function to read the content of the CSV file provided by the professor
 */
function readCSVFile(callback) {
  const csvFilePath = path.join(__dirname, '..', 'assets', '32100260.csv');

  fs.readFile(csvFilePath, 'utf8', (err, csvData) => {
    if (err) {
      /**
       * This is an exception handling
       * It invokes the callback function with an error if there is an error while reading the CSV file
       */
      console.error('Failed to read CSV file:', err);
      callback('Failed to read CSV file');
      return;
    }

    const lines = csvData.split('\n');
    const newRecords = [];

    /**
     * This will parse the records from the CSV file provided from the professor
     */
    for (let i = 1; i < lines.length; i++) {
      const recordData = lines[i].split(',');

      /**
       * This creates a record object as an instance of the object
       * @type {Record}
       */
      const record = {
        REF_DATE: recordData[0],
        GEO: recordData[1],
        DGUID: recordData[2],
        Area: recordData[3],
        UOM: recordData[4],
        UOM_ID: recordData[5],
        SCALAR_FACTOR: recordData[6],
        SCALAR_ID: recordData[7],
        VECTOR: recordData[8],
        COORDINATE: recordData[9],
        VALUE: recordData[10],
        STATUS: recordData[11],
        SYMBOL: recordData[12],
        TERMINATED: recordData[13],
        DECIMALS: recordData[14],
      };

      newRecords.push(record);
    }

    records = newRecords;
    callback(null, records);
  });
}

function saveRecordsToFile() {
  const csvFilePath = path.join(__dirname, '..', 'assets', '32100260_new.csv');

  const csvData = ['REF_DATE,GEO,DGUID,Area,UOM,UOM_ID,SCALAR_FACTOR,SCALAR_ID,VECTOR,COORDINATE,VALUE,STATUS,SYMBOL,TERMINATED,DECIMALS'];

  for (const record of records) {
    const rowData = [
      record.REF_DATE,
      record.GEO,
      record.DGUID,
      record.Area,
      record.UOM,
      record.UOM_ID,
      record.SCALAR_FACTOR,
      record.SCALAR_ID,
      record.VECTOR,
      record.COORDINATE,
      record.VALUE,
      record.STATUS,
      record.SYMBOL,
      record.TERMINATED,
      record.DECIMALS,
    ];

    csvData.push(rowData.join(','));
  }

  fs.writeFile(csvFilePath, csvData.join('\n'), (err) => {
    if (err) {
      console.error('Failed to save records to file:', err);
      return;
    }

    console.log('Records saved to file successfully.');
  });
}

module.exports = {
  getRecords: (_req, res) => {
    res.json(records);
  },
  reloadRecords: (_req, res) => {
    readCSVFile((err, newRecords) => {
      if (err) {
        res.status(500).send(err);
        return;
      }

      res.json(newRecords);
    });
  },
  saveRecords: (_req, res) => {
    saveRecordsToFile();
    res.send('Records saved to file successfully.');
  },
  displayRecord: (req, res) => {
    const { id } = req.params;
    const record = records[id];

    if (!record) {
      res.status(404).send('Record not found');
      return;
    }

    res.json(record);
  },
  displayRecords: (req, res) => {
    const { start, end } = req.query;

    const startIndex = parseInt(start, 10) || 0;
    const endIndex = parseInt(end, 10) || records.length;

    if (startIndex < 0 || startIndex >= records.length || endIndex < 0 || endIndex > records.length) {
      res.status(400).send('Invalid range');
      return;
    }

    const selectedRecords = records.slice(startIndex, endIndex);
    res.json(selectedRecords);
  },
  createRecord: (req, res) => {
    const newRecord = req.body;

    records.push(newRecord);
    res.json(newRecord);
  },
  editRecord: (req, res) => {
    const { id } = req.params;
    const updatedRecord = req.body;

    if (!records[id]) {
      res.status(404).send('Record not found');
      return;
    }

    records[id] = updatedRecord;
    res.json(updatedRecord);
  },
  deleteRecord: (req, res) => {
    const { id } = req.params;

    if (!records[id]) {
      res.status(404).send('Record not found');
      return;
    }

    records.splice(id, 1);
    res.send('Record deleted successfully');
  },
};
