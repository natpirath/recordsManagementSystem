const DataService = require('../services/dataService');
const dataService = new DataService();
const path = require('path');
const fs = require('fs');

/**
 * Controller object containing methods for handling HTTP requests related to records.
 */
module.exports = {
    /**
   * Retrieves all records.
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   */
    getAllRecords: (req, res) => {
      const records = dataService.getRecords();
    
      if (records.length === 0) {
        dataService.loadRecords(50)
          .then((loadedRecords) => {
            res.json(loadedRecords);
          })
          .catch((error) => {
            res.status(500).send(error);
          });
      } else {
        res.json(records);
      }
    },
    
    /**
     * Filters records by type of product.
     * @param {Object} req - The HTTP request object.
     * @param {Object} res - The HTTP response object.
     */
    // filterRecordsByTypeOfProduct: (req, res) => {
    //   const { typeOfProduct } = req.query;
    
    //   if (!typeOfProduct) {
    //     return res.status(400).json({ message: 'TypeOfProduct parameter is required' });
    //   }
    
    //   const filteredRecords = dataService.getRecordsByArea(typeOfProduct);
    //   res.json(filteredRecords);
    // },

    //     /**
    //  * Filters records by type of product.
    //  * @param {Object} req - The HTTP request object.
    //  * @param {Object} res - The HTTP response object.
    //  */
    //     filterRecordsByGeo: (req, res) => {
    //       const { geo } = req.query;
          
    //       if (!geo) {
    //         return res.status(400).json({ message: 'Geo parameter is required' });
    //       }
          
    //       const filteredRecords = dataService.getRecordsByGeo(geo);
    //       res.json(filteredRecords);
    //     },


/**
 * Filters records by type of product and geographical area.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
filterRecordsByProductAndGeo: (req, res) => {
  const { typeOfProduct, geo } = req.query;

  // If neither typeOfProduct nor geo is provided, return all records
  if (!typeOfProduct && !geo) {
    const allRecords = dataService.getAllRecords();
    return res.json(allRecords);
  }

  // If typeOfProduct is provided but not geo, filter by typeOfProduct
  if (typeOfProduct && !geo) {
    const filteredRecords = dataService.getRecordsByProduct(typeOfProduct);
    return res.json(filteredRecords);
  }

  // If geo is provided but not typeOfProduct, filter by geo
  if (!typeOfProduct && geo) {
    const filteredRecords = dataService.getRecordsByGeo(geo);
    return res.json(filteredRecords);
  }

  // If both typeOfProduct and geo are provided, filter by both
  const filteredRecords = dataService.getRecordsByProductAndGeo(typeOfProduct, geo);
  res.json(filteredRecords);
},

    
    /**
     * Reloads records by loading them again from a data source.
     * @param {Object} _req - The HTTP request object.
     * @param {Object} res - The HTTP response object.
     */
    reloadRecords: async (_req, res) => {
      try {
        const loadedRecords = await dataService.loadRecords();
        res.json(loadedRecords);
        console.log('Reloading data..');
      } catch (error) {
        console.error('Failed to reload records:', error);
        res.status(500).send('Failed to reload records');
      }
    },

    /**
     * Sorts records by a specified field.
     * @param {Object} req - The HTTP request object.
     * @param {Object} res - The HTTP response object.
     */
    sortRecordsByField: (req, res) => {
      const { field } = req.query;
    
      if (!field) {
        return res.status(400).json({ message: 'Field parameter is required' });
      }
    
      const sortedRecords = dataService.sortRecordsByField(field);
      
      res.json(sortedRecords);
    },


    /**
     * Persists records to a file called newFile.
     */
    persistData: () => {
      const records = dataService.getRecords();
      console.log('Records:', records);
      const filePath = path.join(__dirname, '..', 'assets', 'newFile.csv');

      const csvData = convertToCSV(records);

      fs.writeFile(filePath, csvData, 'utf8', (err) => {
        if (err) {
          console.error('Failed to persist data:', err);
          // Handle the error and send an appropriate response
        } else {
          console.log('Data persisted successfully.');
          // Send a success response or perform any additional tasks
        }
      });
    },

    /**
 * Loads a specific number of records.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
loadSpecificRecords: (req, res) => {
  const { numRecords } = req.query;

  if (!numRecords) {
    return res.status(400).json({ message: 'numRecords parameter is required' });
  }

  dataService.loadRecords(parseInt(numRecords))
    .then((loadedRecords) => {
      res.json(loadedRecords);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

  };

/**
 * Converts records to CSV format.
 * @param {Array} records - The records to convert.
 * @returns {string} - The CSV data.
 */
function convertToCSV(records) {
  const headers = Object.keys(records[0]).join(',');
  const rows = records.map((record) => Object.values(record).join(','));
  return `${headers}\n${rows.join('\n')}`;
}
