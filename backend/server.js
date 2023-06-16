const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const port = 3000;

app.use(cors());
app.use('/api', apiRoutes);

// Add the CSP modification code here
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self' http://localhost:3000/favicon.ico; img-src 'self'"
  );
  next();
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


