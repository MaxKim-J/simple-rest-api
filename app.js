var express = require('express');
var router = require('./router/main');

var app = express();

// 라우터 적용
app.use('/', router);

// ejs엔진 적용
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// ejs로 렌더링할것!
app.engine('html', require('ejs').renderFile);

var server = app.listen(3000, function () {
  console.log("Express server has started on port 3000")
})