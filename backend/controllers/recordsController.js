const DataService = require('../services/dataService');
const dataService = new DataService();
const path = require('path');
const fs = require('fs');


module.exports = {
    getAllRecords: (req, res) => {
      const records = dataService.getRecords();
    
      if (records.length === 0) {
        dataService.loadRecords()
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
    
    filterRecordsByTypeOfProduct: (req, res) => {
      const { typeOfProduct } = req.query;
    
      if (!typeOfProduct) {
        return res.status(400).json({ message: 'TypeOfProduct parameter is required' });
      }
    
      const filteredRecords = dataService.getRecordsByArea(typeOfProduct);
      res.json(filteredRecords);
    },
    
  
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
  }
};

function convertToCSV(records) {
  const headers = Object.keys(records[0]).join(',');
  const rows = records.map((record) => Object.values(record).join(','));
  return `${headers}\n${rows.join('\n')}`;
}
