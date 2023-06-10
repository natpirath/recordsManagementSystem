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

          records.push(record);
        }

        this.records = records;
        resolve(records);
      });
    });
  }

  getRecords() {
    return this.records;
  }
}

module.exports = DataService;
