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

// Index route to serve your "index.html" file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/post-job', (req, res) => {
  res.sendFile(__dirname + '/public/post-job.html');
});

app.get('/my-account', (req, res) => {
  res.sendFile(__dirname + '/public/my-account.html');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
