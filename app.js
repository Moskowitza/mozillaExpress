var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
<<<<<<< HEAD
const cors = require('cors');
=======
// https://mherman.org/blog/local-authentication-with-passport-and-express-4/
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
>>>>>>> 5d8d39af74210e2529fb7b1fe144b5729511de3e

// in passport tutorial it's like this:
// var routes = require('./routes/index');
// var users = require('./routes/users');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog');  //Import routes for "catalog" area of site

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//error logger and whatever we need cors for
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

<<<<<<< HEAD
//Router
=======

>>>>>>> 5d8d39af74210e2529fb7b1fe144b5729511de3e
app.use('/', indexRouter);
app.use('/catalog', catalogRouter);
//This is the index file in the tutorial
app.use('/users', usersRouter); 

//passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});
//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = process.env.MONGODB_URI || 'mongodb://admin:9dminpassword@ds111993.mlab.com:11993/local_library'
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = app;
