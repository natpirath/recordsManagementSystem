const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const port = 3000;

/**
 * Enable CORS middleware
 */
app.use(cors());

/**
 * Mount the API routes
 */
app.use('/api', apiRoutes);

/**
 * Configure CORS options
 * @type {cors.CorsOptions}
 */
const corsOptions = {
  origin: 'http://localhost:4200',
};

/**
 * Enable CORS with specific options
 */
app.use(cors(corsOptions));

/**
 * Middleware to set Content-Security-Policy (CSP) header
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self' http://localhost:3000/favicon.ico; img-src 'self'"
  );
  next();
});

/**
 * Start the server
 */
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
