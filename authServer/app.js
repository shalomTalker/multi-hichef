
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debug = require('debug')('chatapp:app');
const cors = require("cors");
const mongoose = require('mongoose');
require('./models/User');
require('./models/Token');
const { mongoURI, cookieKey } = require('./config/keys')

const authRouter = require('./routes/authRouter');

const app = express();
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, { /* useNewUrlParser: true, */ useUnifiedTopology: true});
debug('DB is connected');
console.log(process.env);

app.use(
  cors({
    
    origin: "http://localhost:3000",
    credentials: true
  })
);
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/auth", authRouter);

module.exports = app;
