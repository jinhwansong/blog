const express = require("express")

const router = express.Router();

// 게시글을 보냄
router.post("/", (req, res) => { //post api는 post("/post")
    res.json({
        id: 1,
        content: "hi"
    })
})
// 게시글을 삭제
router.delete("/", (req, res) => { //delete api는 delete("/post")
    res.json({
        id: 1,
        content: "hi"
    })
})

module.exports = router