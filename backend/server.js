const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const port = 3000;

/**
 * Enable Cross-Origin Resource Sharing (CORS) middleware.
 */
app.use(cors());

/**
 * Define the API routes.
 */
app.use('/api', apiRoutes);

// Configure CORS options
const corsOptions = {
  origin: 'http://localhost:4200', // Replace with the actual origin of your frontend application
};

/**
 * This enables Cross-Origin Resource Sharing (CORS) middleware with options.
 * @middleware
 * @param {object} corsOptions - The CORS options object.
 */
app.use(cors(corsOptions));

/**
 * This defines the API routes. Without this the persist doesn't work.
 */
app.use('/api', apiRoutes);


// This adds the CSP modification code here
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self' http://localhost:3000/favicon.ico; img-src 'self'"
  );
  next();
});

/**
 * Start the server and listen on the specified port.
 * @param {number} port - The port number to listen on.
 */
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


