global.Err = require('http-errors')
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const mongoose = require('mongoose');
mongoose.set('debug', true);
require('./models/User');
require('./models/Token');
require('./services/passport');
const { mongoURI, cookieKey } = require('./config/keys')

const authRouter = require('./routes/authRouter');

const httpProxy = require('express-http-proxy')
const profileServerProxy = httpProxy('http://profile:8000')
const coreServerProxy = httpProxy('http://core:8001')
const filterServerProxy = httpProxy('http://filter:8002')
const tuningServerProxy = httpProxy('http://tuning:8003')

const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });

const { isVerified } = require('./helpers/routeHelpers')

const app = express();
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});
console.log('DB is connected');

// app.use(
//   cors({

//     origin: "http://localhost:3000",
//     credentials: true
//   })
// );
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/auth', authRouter);
app.use('/profile', passportJWT, isVerified, (req, res, next) => { profileServerProxy(req, res, next) })
app.use('/core', passportJWT, isVerified, (req, res, next) => { coreServerProxy(req, res, next) })
app.use('/filter', passportJWT, isVerified, (req, res, next) => { filterServerProxy(req, res, next) })
app.use('/tuning', passportJWT, isVerified, (req, res, next) => { tuningServerProxy(req, res, next) })

app.use(function ({ statusCode = 500, message }, req, res, next) {
    if(statusCode === 403){
        return res.status(statusCode).json({error:message})
    }
    console.log('error handler call---->');
    res.status(statusCode).send(message)
})


module.exports = app;
