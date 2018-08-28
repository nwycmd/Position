//各种依赖
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//experss-session 中间件
const session = require("express-session");

//路由中间件
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const captchaRouter = require('./routes/captcha');

//创建Express 应用实例
const app = express();

//模版引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("xm"));

//session配置:使用express-session中间件
app.set('trust proxy', 1)
app.use(session({
	secret:'xm',
	resave:false,
	saveUninitialized:true,
	cookie:{ maxAge: 45*60*1000}	
}));

// 指明静态资源存放位置
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/captcha', captchaRouter); // 访问captcha目录下资源

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
