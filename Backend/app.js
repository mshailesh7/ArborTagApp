const express = require('express');
const session = require('express-session');
const fileUpload = require('express-fileupload');
require('./db');
require("dotenv").config();

const userRouter = require('./routes/AuthRoutes.js');
const analysisRouter = require('./routes/AnalysisRoutes.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(session({
  secret: 'your-secret-key', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

// Routes
app.use('/api/v1/auth', userRouter);
app.use('/api/v1/analysis', analysisRouter);

app.use('/uploads', express.static('uploads'));

// Home route
app.get('/', (req, res) => {
  console.log("This is Home Page");
  res.send("Welcome to the Home Page");
});

// Start server
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
