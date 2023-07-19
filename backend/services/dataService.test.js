const { chromium } = require('playwright');
const DataService = require('./dataService');
const { SortedMap } = require('collections/sorted-map'); // Update the import path
const fs = require('fs');
const path = require('path');

/**
 * This is a test class for the the dataService class.
 */
describe('DataService', () => {
  let browser;
  let page;

  /**
   * This launches the browser before running the tests.
   */
  beforeAll(async () => {
    browser = await chromium.launch();
  });

  /**
   * This closes the browser after running the tests.
   */
  afterAll(async () => {
    await browser.close();
  });

  /**
   * This creates a new page before each test.
   */
  beforeEach(async () => {
    page = await browser.newPage();
  });

  /**
   * This tests the loadRecords method of the DataService class.
   */
  afterEach(async () => {
    await page.close();
  });

  it('should load records from CSV file', async () => {
    const dataService = new DataService();

    // Call the loadRecords method
    await dataService.loadRecords();

    // Verify if the records are loaded correctly
    const records = dataService.getRecords();
    expect(records.length).toBeGreaterThan(0); // Ensure records are loaded
  });
});
