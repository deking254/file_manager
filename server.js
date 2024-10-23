const express = require('express');
const routes = require('./routes/index')
const env = require('process');
const cors = require('cors');
const app = express();
const port = env.PORT || 5000;
const path = require('path');
const router = express.Router();
app.use(cors());  // This allows all origins by default
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.listen(port);
