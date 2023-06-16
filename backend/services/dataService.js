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
            UOM_ID: removeDoubleQuotes(recordData[5]),
            SCALAR_FACTOR: removeDoubleQuotes(recordData[6]),
            SCALAR_ID: removeDoubleQuotes(recordData[7]),
            VECTOR: removeDoubleQuotes(recordData[8]),
            COORDINATE: removeDoubleQuotes(recordData[9]),
            VALUE: parseFloat(recordData[10]),
            STATUS: removeDoubleQuotes(recordData[11]),
            SYMBOL: removeDoubleQuotes(recordData[12]),
            TERMINATED: removeDoubleQuotes(recordData[13]),
            DECIMALS: parseFloat(recordData[14]),
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
}

function removeDoubleQuotes(value) {
  if (typeof value === 'string' && value.startsWith('"') && value.endsWith('"')) {
    return value.slice(1, -1);
  }
  return value;
}

module.exports = DataService;
