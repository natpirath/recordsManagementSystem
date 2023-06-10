const DataService = require('../services/dataService');

const dataService = new DataService();

module.exports = {
  getRecords: (_req, res) => {
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
};
