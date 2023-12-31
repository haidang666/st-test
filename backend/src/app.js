const express = require('express');
const cors = require('cors');
const exampleRoutes = require('./api/routes'); // Importing the routes

const app = express();
app.use(cors());

// Middlewares
app.use(express.json());

// Routes
app.use('/api', exampleRoutes); // Mount the routes

module.exports = app;