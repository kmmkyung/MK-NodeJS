const express = require('express'); // 아까 설치한 라이브러리 첨부해주세요
const app = express(); // 첨부한 라이브러리로 객체 만들기(사용법)

app.listen(8080, function(){ // .listen(서버띄울 포트번호, 띄운 후 실행할 코드)함수 쓰면 서버열수있다
  console.log('listening on 8080');
})

// 누군가가 /pet 으로 방문을 하면 pet 관련된 안내문을 띄워주자
// .get(경로, 함수(요청,응답){});
// http://localhost:8080/pet 으로 접속하면 '펫용품을...' 보여준다!
app.get('/pet',function(req,res){
  res.send('펫용품을 쇼핑할 수 있는 페이지입니다.')
});
