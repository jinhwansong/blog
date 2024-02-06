const express = require("express")
const {
    Post,
    Sequelize,
    User,
} = require("../models")
const { isLoggedIn } = require("./middlewares")
const router = express.Router()

router.get("/",async(req,res,next)=>{
    try {
        const posts = await Post.findAll({
            // where:{
            //     id:lastId
            // },
            limit: 10,
            // DESC 최신순 ASC 오래된순
            order:[["createdAt","DESC"]],
            // 다른사람도 좋아요를 햇는지를 보여주는데 의미 없어보임
            include: [{
                model: User, // 좋아요 누른 사람
                as: 'Liked',
                required: false,
                attributes: ['id'],
                through: {
                    attributes: []
                },
            }],
            
            attributes:[
                "id",
                 
                "title",
                "createdAt",
                // 만든사람
                [Sequelize.literal("(SELECT `nickName` FROM `Users` WHERE `Users`.`id` = `Post`.`userId`)"), "nickName"],
                // 이미지 소스
                [Sequelize.literal("(SELECT `src` FROM `Images` WHERE `Images`.`postId` = `Post`.`id`)"), "src"],

                // 정규식 쓰는법
                [Sequelize.literal("REPLACE(REGEXP_REPLACE(`content`, '<[^>]+>', ''), ' ', '')"), 'content'],


            ],
        })
        
        res.status(201).json(posts)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

router.get("/:postId",async(req,res,next)=>{
    try {
        const post = await Post.findOne({
            where: {
                id: req.params.postId
            },
            attributes: [
                "id",
                "content",
                "title",
                "createdAt",
                // 만든사람
                [Sequelize.literal("(SELECT `nickName` FROM `Users` WHERE `Users`.`id` = `Post`.`userId`)"), "nickName"],
            ]
        })
        if (!post) {
            return res.status(403).send("존재하지 않는 게시글 입니다.")
        }
        res.status(201).json(post)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

router.patch("/:postId", isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: {
                id: req.params.postId
            },
        })
        if (!post) {
            return res.status(403).send("존재하지 않는 게시글 입니다.")
        }
        await Post.update({
            content: req.body.content,
            title: req.body.title,
            // 인증할때의 아이디
            UserId: req.user.id,
            CategoreId: req.body.CategoreId
        })
        res.status(201).send("게시물이 수정되었습니다.")
    } catch (error) {
        console.error(error)
        next(error)
    }
})

module.exports = router
