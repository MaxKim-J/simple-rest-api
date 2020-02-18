var express = require('express');
var router = express.Router();
var multer = require('multer');

// multer사용 => 순서는 body-parser => multer => router
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'uploads')
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname)
  }
});

var upload = multer({
  storage: storage,
  limits: {
    files: 10,
    fileSize: 1024 * 1024 * 1024
  }
});


router.route('/upload').post(upload.array('photo', 1), function (req, res) {
  console.log('/process/photo 호출됨.');
  try {
    var files = req.files;

    console.dir('#===== 업로드된 첫번째 파일 정보 =====#')
    console.dir(req.files[0]);
    console.dir('#=====#')

    // 현재의 파일 정보를 저장할 변수 선언
    var originalname = '',
      filename = '',
      mimetype = '',
      size = 0;

    if (Array.isArray(files)) {
      // 배열에 들어가 있는 경우 (설정에서 1개의 파일도 배열에 넣게 했음)
      console.log("배열에 들어있는 파일 갯수 : %d", files.length);

      for (var index = 0; index < files.length; index++) {
        originalname = files[index].originalname;
        filename = files[index].filename;
        mimetype = files[index].mimetype;
        size = files[index].size;
      }

    } else {   // 배열에 들어가 있지 않은 경우 (현재 설정에서는 해당 없음)
      console.log("파일 갯수 : 1 ");

      originalname = files[index].originalname;
      filename = files[index].name;
      mimetype = files[index].mimetype;
      size = files[index].size;
    }

    console.log('현재 파일 정보 : ' + originalname + ', ' + filename + ', '
      + mimetype + ', ' + size);

    // 클라이언트에 응답 전송
    res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
    res.write('<h3>파일 업로드 성공</h3>');
    res.write('<hr/>');
    res.write('<p>원본 파일명 : ' + originalname + ' -> 저장 파일명 : ' + filename + '</p>');
    res.write('<p>MIME TYPE : ' + mimetype + '</p>');
    res.write('<p>파일 크기 : ' + size + '</p>');
    res.end();
  } catch (err) {
    console.dir(err.stack);
  }
});

module.exports = router;
