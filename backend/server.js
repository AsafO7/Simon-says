const express = require('express')
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
// const port = process.env.PORT || 5000;

connectDB()

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/leaderboard', require('./routes/leaderboardRoutes'))
  
app.listen(process.env.PORT || 5000);