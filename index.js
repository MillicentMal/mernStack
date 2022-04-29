const express = require('express');
const app = express();
require('dotenv/config');
const mongoose = require('mongoose');


mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }); 
const db = mongoose.connection;

