global.Err = require('http-errors')
const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
mongoose.set('debug', true);
require('./models/User');

const indexRouter = require('./routes/index');

const { mongoURI, cookieKey } = require('./config/keys')

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useFindAndModify: false
});
console.log('DB is connected');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);
app.use(function ({ statusCode = 500, message }, req, res, next) {
    if (statusCode === 403) {
        return res.status(statusCode).json({ error: message })
    }
    console.log('error handler call---->');
    res.status(statusCode).send(message)
})
module.exports = app;
