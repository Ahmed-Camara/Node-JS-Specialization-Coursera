var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const auth = (req,res,next) => {

  console.log(req.headers);

  const authHeader = req.headers.authorization;

  if(!authHeader){

    let err = new Error(`You are not authenticated`);
    res.setHeader('WWW-Authenticate','Basic');
    err.status = 401;
    return next(err);
  }


  const auth = new Buffer.from(authHeader.split(' ')[1],'base64').toString().split(':');

  const username = auth[0];
  const password = auth[1];

  if(username === 'admin' && password === 'password'){

    next();
  }else{

    let err = new Error(`You are not authenticated`);
    res.setHeader('WWW-Authenticate','Basic');
    err.status = 401;
    return next(err);
  }
};

app.use(auth);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter);
 
const mongoose = require('mongoose');
const Promotions = require('./models/promotions');
const Leaders = require('./models/leaders');

const url = 'mongodb+srv://camara:ahmed@cluster0.pmrnt.mongodb.net/test';

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
