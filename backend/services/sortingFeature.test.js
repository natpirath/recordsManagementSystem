const DataService = require('../services/dataService');
jest.mock('../services/binarySearchTree.js');
const BinarySearchTree = require('../services/binarySearchTree.js');

describe("DataService", () => {
    let dataService;
  
    beforeEach(() => {
      dataService = new DataService();
      // Mock the records data
      dataService.records = [
        { TYPE_OF_PRODUCT: 'Product1' },
        { TYPE_OF_PRODUCT: 'Product3' },
        { TYPE_OF_PRODUCT: 'Product2' }
      ];
    });

    test("sortRecordsByField sorts records correctly", () => {
      // Mock the BinarySearchTree instance
      const bstInstance = {
        insert: jest.fn(),
        inOrder: jest.fn()
      };
      BinarySearchTree.mockImplementation(() => bstInstance);
  
      dataService.sortRecordsByField('TYPE_OF_PRODUCT');
  
      // Check if the BinarySearchTree's insert function was called with correct parameters
      expect(bstInstance.insert.mock.calls).toEqual([
        ['PRODUCT1', { TYPE_OF_PRODUCT: 'Product1' }],
        ['PRODUCT3', { TYPE_OF_PRODUCT: 'Product3' }],
        ['PRODUCT2', { TYPE_OF_PRODUCT: 'Product2' }]
      ]);
  
      // Check if the BinarySearchTree's inOrder function was called
      expect(bstInstance.inOrder).toHaveBeenCalled();
    });
});
