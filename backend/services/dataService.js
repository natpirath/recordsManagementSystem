const fs = require('fs');
const path = require('path');

class DataService {
  constructor() {
    this.records = [];
  }

  loadRecords() {
    return new Promise((resolve, reject) => {
      const csvFilePath = path.join(__dirname, '..', 'assets', '32100260.csv');

      fs.readFile(csvFilePath, 'utf8', (err, csvData) => {
        if (err) {
          console.error('Failed to read CSV file:', err);
          reject('Failed to read CSV file');
          return;
        }

        const lines = csvData.split('\n');
        const records = [];

        for (let i = 1; i < 100 && i < lines.length; i++) {
          const recordData = lines[i].split(',');

          const record = {
            REF_DATE: removeDoubleQuotes(recordData[0]),
            GEO: removeDoubleQuotes(recordData[1]),
            DGUID: removeDoubleQuotes(recordData[2]),
            TYPE_OF_PRODUCT: removeDoubleQuotes(recordData[3]),
            TYPE_OF_STORAGE: removeDoubleQuotes(recordData[4]),
            UOM: removeDoubleQuotes(recordData[5]),
            UOM_ID: removeDoubleQuotes(recordData[6]),
            SCALAR_FACTOR: removeDoubleQuotes(recordData[7]),
            SCALAR_ID: removeDoubleQuotes(recordData[8]),
            VECTOR: removeDoubleQuotes(recordData[9]),
            COORDINATE: removeDoubleQuotes(recordData[10]),
            VALUE: removeDoubleQuotes(recordData[11]),
            STATUS: removeDoubleQuotes(recordData[12]),
            SYMBOL: removeDoubleQuotes(recordData[13]),
            TERMINATED: removeDoubleQuotes(recordData[14]),
            DECIMALS: removeDoubleQuotes(recordData[15]),
          };

          records.push(record);
        }

        this.records = records;
        resolve(records);
      });
    });
  }

  getRecordsByArea(typeOfProduct) {
    // Filter the records based on the category
    return this.records.filter(record => record.TYPE_OF_PRODUCT === typeOfProduct);
  }

  getRecords() {
    return this.records;
  }

  createRecord(newRecord) {
    this.records.push(newRecord);
  }

  updateRecord(recordId, updatedRecord) {
    const index = this.records.findIndex(record => record.id === recordId);
    if (index !== -1) {
      this.records[index] = updatedRecord;
      return true;
    }
    return false;
  }
}

function removeDoubleQuotes(value) {
  if (typeof value === 'string' && value.startsWith('"') && value.endsWith('"')) {
    return value.slice(1, -1);
  }
  return value;
}

module.exports = DataService;
