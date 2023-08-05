const express = require('express'); // 아까 설치한 라이브러리 첨부해주세요
const app = express(); // 첨부한 라이브러리로 객체 만들기(사용법)
app.use(express.urlencoded({extended: true}));
const MongoClient = require('mongodb').MongoClient;
app.set('view engine','ejs');
var db;

MongoClient.connect('mongodb+srv://admin:20131876@cluster0.jl1pweh.mongodb.net/?retryWrites=true&w=majority',{ useUnifiedTopology: true },function(에러,client){
  if (에러) return console.log(에러)
	db = client.db('todoapp');
  // 저장할 데이터 콜백함수
  // db.collection('post').insertOne( {이름 : 'John', _id : 100} , function(에러, 결과){
  //   console.log('저장완료'); 
  // });
  app.listen(8080, function(){ // .listen(서버띄울 포트번호, 띄운 후 실행할 코드)함수 쓰면 서버열수있다
    console.log('listening on 8080')
  });

  // 어떤 사람이 /add 경로로 post 요청 -> 입력값은 req로 전달
  app.post('/add',function(req,res){
    res.send('전송완료')
    // db에 counter 에서 게시물갯수 찾아
    db.collection('counter').findOne({name: '게시물갯수'},function(에러,결과){
      console.log(결과.totalPost);
      var 총게시물갯수 = 결과.totalPost;
      
      // DB저장
      // db중 'post'란곳에 insertone이란 데이터 넣어주셈
      db.collection('post').insertOne({_id:총게시물갯수+1,title:req.body.title, date:req.body.date},function(에러,결과){
        console.log('저장완료');
        // 게시물 증가할때마다 totalPost도 1 증가시켜주셈

        db.collection('counter').updateOne({name:'게시물갯수'},{ $inc : {totalPost:1}},function(에러,결과){
          // 업데이트 시켜주면 이 코드 실행시켜주세여
          if(에러){return console.log(에러);}
        })
      });
    });
  });
});


// 누군가가 /pet 으로 방문을 하면 pet 관련된 안내문을 띄워주자
// .get(경로, 함수(요청,응답){});
// http://localhost:8080/pet 으로 접속하면 '펫용품을...' 보여준다!
app.get('/pet',function(req,res){
  res.send('펫용품을 쇼핑할 수 있는 페이지입니다.')
});

app.get('/beauty',function(req,res){
  res.send('뷰티용품을 쇼핑할 수 있는 페이지입니다.')
});

// .sendFile(보낼파일경로) 홈페이지 접속했을떄 파일 보내주세요
app.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html')
});

app.get('/write', function(req,res) { 
  res.sendFile(__dirname +'/write.html')
});

// list로 GET요청으로 접속하면
// 실제 DB에 저장된 페이지 보여줌
app.get('/list', function(req,res) { 
  // 디비에 저장된 post라는 컬렉션 안에 모든 데이터 꺼내주셈
  db.collection('post').find().toArray(function(에러,결과){
    console.log(결과);
    // ejs 파일에 집어넣기
    // 화면으로 보여주셈 
    res.render('list.ejs',{posts : 결과});
  });
});
