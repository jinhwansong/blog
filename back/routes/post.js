const express = require("express")
const router = express.Router()
const {
    Post,
    Comment,
    Categore
} = require("../models")
const {
    isLoggedIn,
} = require("../routes/middlewares")
const { Sequelize } = require("sequelize")

// 게시글 보냄
router.post("/", isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.create({
            content: req.body.content,
            title: req.body.title,
            // 인증할때의 아이디
            UserId:req.user.id,
            CategoreId: req.body.CategoreId
        })
        res.status(201).json(post)
    } catch (error) {
        console.error(error)
        next(error)
    }
})


// 카테고리 정보를 넘겨줌
router.get("/categore",async(req,res,next)=>{
    try {
        const categore = await Categore.findAll({
            
            include: [{
                model: Post,
                // 게시물 정보는 가져오지 않음
                attributes: [], 
                // 모든 카테고리를 조회
                required: false 
            }], 
            attributes: [
                "categore",
                "id",
                // 게시물 개수를 COUNT 함수로 계산하여 별칭 "postCount"로 반환
                [Sequelize.fn("COUNT", Sequelize.col("Posts.id")), "count"] 
            ],
            // 카테고리별로 그룹화하여 결과 반환
            group: ["categore.id"] 
        })
        res.status(201).json(categore)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

// 댓글 작성
router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where:{id:req.params.postId}
        })
        if (!post){
            return res.status(403).send("존재하지 않는 게시글 입니다.")
        }
        const comment = await Comment.create({
            content: req.body.content,
            PostId:req.params.postId,
            // 인증할때의 아이디
            UserId: req.user.id
        })
        res.status(201).json(comment)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

// 게시글 삭제함
router.delete("/:postId", isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.destroy({
            where:{
                id:req.params.postId,
                // 내꺼만 지울수 있게.
                UserId:req.user.id
            }
        })
        if(!post){
            return res.status(403).send("본인게시물이 아닙니다.")
        }
        res.status(200).json({PostId:req.params.postId})
    } catch (error) {
        console.error(error)
        next(error)
    }
})


// 좋아요
router.patch('/:postId/like', isLoggedIn, async (req, res, next) => { // PATCH /post/1/like
    try {
        const post = await Post.findOne({
            where: {
                id: req.params.postId
            }
        });
        if (!post) {
            return res.status(403).send('게시글이 존재하지 않습니다.');
        }
        await post.addLiked(req.user.id);
        res.json({
            PostId: post.id,
            UserId: req.user.id
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
});
// 싫어요
router.delete("/:postId/like", isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: {
                id: req.params.postId
            }
        })
        if (!post) {
            return res.status(403).send("게시글이 존재하지 않습니다.")
        }
         await post.removeLiked(req.user.id);
         res.json({
             PostId: post.id,
             UserId: req.user.id
         });
    } catch (error) {
        console.error(error)
        next(error)
    }
})

module.exports = router