const express = require("express")
const router = express.Router()



// 게시글 보냄
router.post("/",(req,res)=>{
    res.json({
        id:1,
        content:"h1"
    })
})

// 게시글 삭제함
router.delete("/", (req, res) => {
    res.json({
        id: 1,
        content: "h1"
    })
})

module.exports = router