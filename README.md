# Records Management System

This project is a Records Management System web application built with Angular and Node.js. It allows users to manage and manipulate records from a provided CSV dataset.

## Features

- Display records in a table format
- Reload data from the dataset
- Persist data from memory to disk as a CSV file
- Select and display individual records
- Create new records
- Edit existing records
- Delete records

## Technologies Used

- Angular
- Node.js
- Express
- CSV Parser
- HttpClient

## Installation

1. Clone the repository: `git clone <repository_url>`
2. Navigate to the backend directory: `cd backend`
3. Install the dependencies: `npm install`
4. Start the backend server: `node server.js`
5. Open a new terminal and navigate to the frontend directory: `cd ../frontend`
6. Install the dependencies: `npm install`
7. Start the frontend application: `ng serve`
8. Open your browser and visit: `http://localhost:4200`

## Usage

Once the application is up and running, you can perform the following actions:

- Use the navigation menu to access different features of the Records Management System.
- The "Display Records" page will show all records in a table format.
- Use the "Reload Data" button to refresh the records from the dataset.
- Use the "Save Data" button to persist the records to disk as a CSV file.
- Select a record to display its details on the right side of the page.
- Use the "Create Record" button to add a new record to the system.
- Edit existing records by selecting a record and modifying its properties.
- Delete records by selecting a record and clicking the "Delete" button.
