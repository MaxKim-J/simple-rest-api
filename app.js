var express = require('express');
var static = require('serve-static');
var path = require('path')
var router = require('./router/main');
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs")

// express 객체 선언
var app = express();

// 포트 설정 
app.set('port', process.env.PORT || 3000)

//body-parser은 post요청이 들어왔을 때의 본문을 파싱할 수 있게 해줌
// json, 혹은 form-urlencoded로 왔든 파싱 가능하게
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// public 폴더에 있는 모든 파일을 웹 서버의 루트 패스로 접근할 수 있도록 만들기
// 이렇게 use에다가 첫번째 파라미터로 요청 패스를 지정했으며, 두번째 파라미터 static함수로 특정 폴더 지정(매핑)
app.use('/public', static(path.join(__dirname, 'public')));

// 미들웨어 #1 - 로컬호스트 url로 요청왔을때의 응답
app.use(function (req, res, next) {
  console.log('첫번째 미들웨어에서 요청을 처리함');

  // 이런식으로 쿼리로 넘어온 파리미터나 유저 에이전트 정보 쉽게 가져올 수 이씀
  // var userAgent = req.header('User-Agent');
  // var paramName = req.query.name;

  // get요청과 post요청을 모두 고려
  var paramId = req.body.id || req.query.id;
  var paramPassword = req.body.password || req.query.password;

  res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
  res.write('<h1>응답을 받아랏</h1>')
  res.write('<div>user Agent : ' + paramId + '</div>')
  res.write('<div>Param Name : ' + paramPassword + '</div>')

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


// 서버 실행
var server = app.listen(app.get('port'), function () {
  console.log("Express server has started on port 3000")
})

