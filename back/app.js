const express = require("express")
const postRouter = require("./routes/post")
const db = require("./models")
const app = express()

// db에 있는거를 가지고 온다.
// sync는 sequelize와 데이터베이스를 연결시키는 메소드임
db.sequelize.sync().then(() => {
    console.log("db 연결완료")
}).catch(console.error)


// 라우터 분기 
app.use("/post", postRouter)


app.listen(3065, () => {
    console.log("서버실행중!!")
})