var express = require('express');
var router = express.Router();

// 라우터는 최하단의 미들웨어라고 생각하면 좋겠군
// 미들웨어가 할 수 있는 일을 라우터도 할 수 이따!
// 그리고 라우터 위의 미들웨어에서 res.end()하면 라우터 동작 안한다
router.route('/process/login/:name').post(function (req, res) {
  console.log('로그인을 처리하겠수다!');

  // :로 지정한 동적 라우팅 파라미터
  var paramName = req.params.name;
  var paramId = req.body.id || req.query.id;
  var paramPassword = req.body.password || req.query.password;

  res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
  res.write('<h1>로그인을 처리했도다</h1>');
  res.write('<div>Param name : ' + paramName + '</div>');
  res.write('<div>Param id : ' + paramId + '</div>');
  res.write('<div>Param password : ' + paramPassword + '</div>');
  res.write("<div><a href= '/public/html/login.html'>로그인 페이지로 돌아가기</a></div>");
  res.end();
});
module.exports = router;