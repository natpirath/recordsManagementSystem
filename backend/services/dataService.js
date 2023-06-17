const fs = require('fs');
const path = require('path');

class DataService {
  constructor() {
    this.records = [];
  }

  /**
   * Load records from a CSV file.
   * @returns {Promise<Array<Object>>}
   */
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

        // Start from index 1 to skip the header line
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

  /**
   * Get records filtered by the type of product.
   * @param {string} typeOfProduct - The type of product to filter records.
   * @returns {Array<Object>} An array of filtered records.
   */
  getRecordsByArea(typeOfProduct) {
    // Filter the records based on the type of product
    return this.records.filter(record => record.TYPE_OF_PRODUCT === typeOfProduct);
  }

  /**
   * Get all records.
   * @returns {Array<Object>} An array of all records.
   */
  getRecords() {
    return this.records;
  }

  /**
   * Create a new record.
   * @param {Object} newRecord - The new record to be created.
   */
  createRecord(newRecord) {
    this.records.push(newRecord);
  }

  /**
   * Update a record by its index ID
   * @param {string} recordId - The ID (index) of the record to be updated.
   * @param {Object} updatedRecord - The updated record data.
   * @returns {boolean} True if the record was updated successfully, false if not.
   */
  updateRecord(recordId, updatedRecord) {
    const index = this.records.findIndex(record => record.id === recordId);
    if (index !== -1) {
      this.records[index] = updatedRecord;
      return true;
    }
    return false;
  }
}

/**
 * Remove double quotes from the data that is displayed in the table
 * @param {string} value - The value to remove double quotes from.
 * @returns {string} The value without double quotes.
 */
function removeDoubleQuotes(value) {
  if (typeof value === 'string' && value.startsWith('"') && value.endsWith('"')) {
    return value.slice(1, -1);
  }
  return value;
}

module.exports = DataService;
