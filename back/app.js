const express = require("express")
const cors = require("cors")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const passport = require("passport")
const dotenv = require("dotenv")
const postRouter = require("./routes/post")
const postsRouter = require("./routes/posts")
const userRouter = require("./routes/user")
const passportConfig = require("./passport")
const db = require("./models")

const app = express()

dotenv.config()



// db에 있는거를 가지고 온다.
// sync는 sequelize와 데이터베이스를 연결시키는 메소드임
db.sequelize.sync().then(() => {
    console.log("db 연결완료")
}).catch(console.error)
// 로그인 
passportConfig()


app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))
app.use(express.json()) 
app.use(express.urlencoded({
    extended: true
}))


app.use(cookieParser(process.env.COOKIE_SECET))
app.use(session({
    saveUninitialized:false,
    resave:false,
    // 세션키라고 생각하자... 해킹당하면 ㅈ되는겨
    secret: process.env.COOKIE_SECET,
}))
app.use(passport.initialize())
app.use(passport.session())


app.use("/post", postRouter)
app.use("/posts", postsRouter)
app.use("/user", userRouter)

app.listen(3065, () => {
    console.log("서버 실행중!!")
})