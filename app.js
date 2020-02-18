var express = require('express');
var router = require('./router/main');
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs")

var app = express();

// 미들웨어 #1 - 로컬호스트 url로 요청왔을때의 응답
app.use(function (req, res, next) {
  console.log('첫번째 미들웨어에서 요청을 처리함');
  var userAgent = req.header('User-Agent');
  // 이런식으로 쿼리로 넘어온 파리미터 쉽게 가져올 수 이씀
  var paramName = req.query.name;

  res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
  res.write('<h1>응답을 받아랏</h1>')
  res.write('<div>user Agent : ' + userAgent + '</div>')
  res.write('<div>Param Name : ' + paramName + '</div>')

  // 처리 순서 넘겨주기
  next();
})

// 미들웨어 #2 - 로컬호스트 url로 요청왔을때의 응답
app.use(function (req, res, next) {
  console.log('두번째 미들웨어에서 요청을 처리함');

  // 보낼 데이터 명시하고 end로 미들웨어 끝내주면서 응답 보내기
  // res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
  // res.end('<h1>' + req.user + '의 요청이군!</h1>')

  // 요러케 하면 json을 데이터를 보냄
  //todo 요청객체, 응답객체 정리
  // res.send({ name: 'max', age: 20 })

  res.end();
})

// 로컬호스트 포트 지정
// set으로 express 객체(app) 안에 설정한 속성은 get으로 뽑아서 쓸 수 이따
//todo 메소드 정리

app.set('port', process.env.PORT || 3000)
var server = app.listen(app.get('port'), function () {
  console.log("Express server has started on port 3000")
})

