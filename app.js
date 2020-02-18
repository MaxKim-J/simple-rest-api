var express = require('express');
var router = require('./router/main');
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs")

var app = express();


// ejs엔진 적용
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// ejs로 렌더링할것!
app.engine('html', require('ejs').renderFile);

var server = app.listen(3000, function () {
  console.log("Express server has started on port 3000")
})

app.use(express.static('public'));

// 세션 모듈만 써도 직접 쿠키에 접근할 수 있어서 cookie-parser은 이제 필요 없음
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
  // 쿠키 임의 변조를 막기 위한 sign값
  secret: '@#@$MYSIGN#@$#$',
  // 세션을 언제나 저장할 것인지 정하는 값
  resave: false,
  // 새로 생겼지만 변경되지 않는 세션
  saveUninitialized: true
}));

// 라우터 적용
// bodyparser 밑에 있어야 함
app.use('/', router);