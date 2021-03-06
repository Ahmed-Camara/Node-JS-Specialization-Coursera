var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');
const dishRouter = require('./routes/dishRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser('12345-67890-09876-54321'));
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({

  name:'session-id',
  secret:'12345-67890-09876-54321',
  saveUninitialized:false,
  resave:false,
  store:new FileStore()

}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const ErrorMessageGeneration = (req,res) => {
  
  
  let err = new Error(`You are not authenticated`);
  err.status = 403;

  return err;

};

function auth (req, res, next) {
  console.log(req.session);

  if(!req.session.user) {

    return next(ErrorMessageGeneration(req,res));

  }
  else {
    
    if (req.session.user === 'authenticated') {
      next();
    }
    else {

      return next(ErrorMessageGeneration(req,res));
    }
  }
};

app.use(auth);


app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter);
 
const mongoose = require('mongoose');
const Promotions = require('./models/promotions');
const Leaders = require('./models/leaders');

const url = 'mongodb+srv://<username>:<password>@cluster0.pmrnt.mongodb.net/test';

const connect = mongoose.connect(url);

connect.then((db) => {
  
  console.log(`Application successfully connected to the database`);

},(err) => {console.log(err);});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;