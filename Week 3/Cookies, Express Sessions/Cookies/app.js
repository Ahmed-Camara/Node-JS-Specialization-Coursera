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
app.use(cookieParser('12345-67890-09876-54321'));
app.use(express.static(path.join(__dirname, 'public')));

const ErrorMessageGeneration = (req,res) => {
  
  res.setHeader('WWW-Authenticate','Basic')
  let err = new Error(`You are not authenticated`);
  err.status = 401;

  return err;

};
const auth = (req,res,next) => {

  if(!req.signedCookies.user){

    const authHeader = req.headers.authorization;
    
    if(!authHeader){

      
      return next(ErrorMessageGeneration(req,res));
    }

    const auth = new Buffer.from(authHeader.split(' ')[1],'base64').toString().split(':');

    const username = auth[0];
    const password = auth[1];

    if(username === 'admin' && password === 'password'){

      res.cookie('user','admin',{signed:true});

      next();

    }else{

      return next(ErrorMessageGeneration(req,res));

    }

  }else{

    if(req.signedCookies.user === 'admin'){

      next();

    }else{
      return next(ErrorMessageGeneration(req,res));
    }
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

const url = 'mongodb+srv://<username>:<passowrd>@cluster0.pmrnt.mongodb.net/test';

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
