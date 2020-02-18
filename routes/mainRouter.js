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

  if (req.session.user) {
    console.log("님은 이미 로그인됐음 상품페이지나 가라");
  } else {
    // 로그인시에 user라는 세션을 만들고 저장함
    req.session.user = {
      id: paramId,
      name: 'anonymous user' || paramName,
      authorized: true
    }
  }
  res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
  res.write('<h1>로그인을 처리했도다</h1>');
  res.write('<div>Param name : ' + paramName + '</div>');
  res.write('<div>Param id : ' + paramId + '</div>');
  res.write('<div>Param password : ' + paramPassword + '</div>');
  res.write("<div><a href= '/process/product'>상품 페이지로 가라</a></div>");

  // 요청에 적용하고 싶은 미들웨어가 모두 끝났을 때 end는 작동해야함 
  res.end();
});

router.route('/:id').get(function (req, res) {
  console.log("토큰값 붙여서 요청 처리! 쿠키호출!")
  var paramId = req.params.id;
  //여기를 요청하면 쿠키가 발행, 그리고 브라우저에 계속 머무름
  res.cookie('user', {
    id: 'max',
    name: '배고팡',
    authorized: true,
  })

  res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
  res.write('<h1>토큰을 처리한다!</h1>');
  res.write('<div> paramId : ' + paramId + '</div>');
  res.end();
})

router.route("/show/cookie").get(function (req, res) {
  res.send(req.cookies);
})

router.route("/process/product").get(function (req, res) {
  console.log("상품 페이지로 갑니다");
  // 유저 세션이 있는지 확인한다
  //? 근데 세션은 서버의 어디에 저장되는걸까...?
  if (req.session.user) {
    // 있으면 프로덕트로
    res.redirect('../public/html/product.html');
  } else {
    // 없으면 로그인으로
    res.redirect('../public/html/login.html');
  }
})

router.route("/process/logout").get(function (req, res) {
  console.log("로그아웃 하지롱");
  // 유저 세션이 있는지 확인한다
  if (req.session.user) {
    // 있으면 로그아웃 시키고 세션을 파괴한다
    console.log("로그아웃 성공이다 이거야");
    req.session.destroy(function (err) {
      if (err) { throw err };
      console.log("세션을 삭제했음");
      res.redirect('../public/html/login.html');
    });
    // 없으면 로그인으로 리다이렉 시킨다
  } else {
    console.log("아직 로그인도 안했는데 로그아웃을 어캐함?");
    res.redirect('../public/html/login.html');
  }
});
module.exports = router;