const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const apiRoutes = require('./src/routes/apiRoutes');

// Middleware
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static('public'));

// Use API routes
app.use('/api', apiRoutes);

app.use(bodyParser.urlencoded({ extended: false }));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
