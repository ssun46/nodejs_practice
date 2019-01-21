var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan'); // log를 보여주기 위한 미들웨어
var session = require('express-session');
var flash = require('connect-flash'); // 일회성 메시지를 보여주기 위한 미들웨어

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// add
app.use(function(req, res, next) {
  console.log(req.url, '저도 미들웨어입니다.');
  next(); // 반드시 호출해야 middleware의 흐름을 이어감
});

app.use(logger('combined'));
app.use('/img', express.static(path.join(__dirname, 'public/images')));
app.use(bodyParser.json());
// app.use(bodyParser.raw());
// app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret code'));
app.use(session({ // express 1.5 이전에는 cookiePaser보다 뒤에 위치해야함
  resave: false,
  saveUninitialized: false,
  secret: 'secret code',
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(flash()); // cookie-parser와 express-session을 사용하므로 이들보다 뒤에 위치해야 함
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/', function(req, res, next) {
  console.log('/ 주소의 요청일 때만 실행됩니다. HTTP 메서드는 상관없습니다.');
  next();
});
app.get('/', function(req, res, next) {
  console.log('GET 메서드 / 주소의 요청일 때만 실행됩니다.');
  next();
});
app.post('/', function(req, res, next) {
  console.log('POST 메서드 / 주소의 요청일 때만 실행됩니다.');
  next();
});
// app.use('/', function(req, res, next) {
//   console.log('첫 번째 미들웨어');
//   next();
// }, function(req, res, next) {
//   console.log('두 번째 미들웨어');
//   next();
// }, function(req, res, next) {
//   console.log('세 번째 미들웨어');
//   next('route', indexRouter);
// });
app.use('/users', usersRouter);

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
