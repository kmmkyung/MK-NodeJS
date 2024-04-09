const express = require('express');
const app = express();
app.set('view engine','ejs')
app.use(express.static(__dirname+'/public'))

const { MongoClient } = require('mongodb')

let db
const url = 'mongodb+srv://admin:20131876@cluster0.ffx97gs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
new MongoClient(url).connect().then((client)=>{ // 접속하고 성공하면
  console.log('DB연결성공')
  db = client.db('forum') // forum에 접속해줘
  app.listen(8080,()=>{
    console.log('http://localhost:8080 에서 서버 실행중');
  })
}).catch((err)=>{ // 근데 오류나면 오류출력
  console.log(err)
}) 

app.get('/',(요청,응답)=>{
  응답.sendFile(__dirname+'/index.html')
})

app.get('/news',(요청,응답)=>{
  // db.collection('post').insertOne({title:'어쩌구'})
  // 응답.send('오늘비옴')
})

app.get('/list',async(요청,응답)=>{
  let result = await db.collection('post').find().toArray()
  응답.render('list.ejs',{ posts : result})
})