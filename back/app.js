const express = require("express")
const postRouter = require("./routes/post")
const app = express();

const db = require("./models")
db.sequelize.sync().then(() => {
    console.log("db 연결완료")
}).catch(console.error)

// 라우터 분기 
app.use("/post",postRouter)

// 게시글을 가져옴
app.get("/posts", (req, res) => {
    res.json([{
            id: 1,
            content: "hi"
        },
        {
            id: 2,
            content: "hi2"
        },
        {
            id: 3,
            content: "hi3"
        },
    ])
})



app.listen(3065,()=>{
    console.log("서버실행중!!")
})