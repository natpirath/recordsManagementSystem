const fs = require('fs');
const path = require('path');
const BinarySearchTree = require('./binarySearchTree.js'); // Import the BinarySearchTree class

/**
 * This class is a service
 */
class DataService {
  constructor() {
    this.records = [];
  }

  /**
   * Loads records from a CSV file.
   * @param {number} [maxRecords] - Maximum number of records to load. If not specified, all records are loaded.
   * @returns {Promise<Array>} A promise that resolves with the loaded records.
   * @throws {string} If failed to read the CSV file.
   */
  loadRecords(maxRecords) {
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
        const limit = maxRecords || lines.length;

        for (let i = 1; i < limit && i < lines.length; i++) {
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
   * This retrieves records filtered by the type of product.
   * @param {string} typeOfProduct - The type of product to filter by.
   * @returns {Array} The filtered records.
   */
  getRecordsByProduct(typeOfProduct) {
    return this.records.filter(record => record.TYPE_OF_PRODUCT === typeOfProduct);
  }

  /**
   * This retrieves records filtered by the type of product.
   * @param {string} typeOfProduct - The type of product to filter by.
   * @returns {Array} The filtered records.
   */
    getRecordsByGeo(geo) {
      return this.records.filter(record => record.GEO === geo);
    }

  /**
   * This retrieves records filtered by the type of product and GEO.
   * @param {string} typeOfProduct - The type of product to filter by.
   * @param {string} geo - The geographical area to filter by.
   * @returns {Array} The filtered records.
   */
    getRecordsByProductAndGeo(typeOfProduct, geo) {
      return this.records.filter(record => 
        record.TYPE_OF_PRODUCT === typeOfProduct && record.GEO === geo);
    }  

  /**
   * This retrieves all records.
   * @returns {Array} All records.
   */
  getRecords() {
    return this.records;
  }

  /**
   * This creates a new record.
   * @param {object} newRecord - The new record to create.
   */
  createRecord(newRecord) {
    this.records.push(newRecord);
  }

  /**
   * This updates a record by index ID.
   * @param {string} recordId - The ID of the record to update.
   * @param {object} updatedRecord - The updated record data.
   * @returns {boolean} True if the record was updated successfully, false otherwise.
   */
  updateRecord(recordId, updatedRecord) {
    const index = this.records.findIndex(record => record.id === recordId);
    if (index !== -1) {
      this.records[index] = { ...this.records[index], ...updatedRecord };
      return true;
    }
    return false;
  }

/**
 * This sorts records by a specified field.
 * @param {string} field - The field to sort by.
 * @returns {BinarySearchTree} The sorted records.
 */
  sortRecordsByField(field) {
    const bst = new BinarySearchTree();

    for (let record of this.records) {
      const value = record[field].toUpperCase();
      bst.insert(value, record);
    }
    
    const sortedRecords = [];
    bst.inOrder(bst.root, record => sortedRecords.push(record));
    return sortedRecords;
  }
}

/**
 * This removes double quotes from a value if present.
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
