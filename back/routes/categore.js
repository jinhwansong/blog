const express = require("express")
const { Categore, Post, Sequelize, User, Image, Hashtag } = require("../models")
const router = express.Router()

// 카테고리 정보를 넘겨줌
router.get("/", async (req, res, next) => {
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


router.get("/:categore",async(req,res,next)=>{
    
    try {
        const users = req.user ? req.user.id : null;
        const offset = (parseInt(req.query.page) - 1) * 10 || 0
        const {
            count,
            rows: post
        } = await Post.findAndCountAll({
            offset: offset,
            limit: 10,

            // DESC 최신순 ASC 오래된순
            order: [
                ["createdAt", "DESC"]
            ],

            include: [{
                model: Hashtag,
                attributes: ["hashtag"],
                
            }, {
                model: Image,
                attributes: ["src"],
            }, {
                model: User,
                attributes: ["nickName"],
            }, {
                model: Categore,
                attributes: ["categore"],
                
                where:{
                    categore: req.params.categore
                }
            }],

            attributes: [
                "id",
                "title",
                "createdAt",
                "view",
                "content",
                // 좋아요 수
                [Sequelize.literal("(SELECT COUNT(*) FROM `Like` WHERE `Like`.`postId` = `Post`.`id`)"), "count"],
                // 좋아요 여부
                [Sequelize.literal("IF((SELECT `postId` FROM `Like` WHERE `Like`.`postId` = `Post`.`id` AND `Like`.`userId` = " + users + "), 1, 0)"), "like"],
            ],
        })
        const posts = post.map((post) => {
            const format = post.toJSON()
            format.hashtag = format.Hashtags.map((tag) => tag.hashtag)
            format.src = format.Images.map((img) => img.src).join("")
            format.nickname = format.User.nickName
            format.categore = format.Categore.categore
            format.content = format.content.replace(/<[^>]+>|<img.*?>/g, "");
            delete format.Images;
            delete format.User;
            delete format.Categore;
            delete format.Hashtags;
            return format;
        })

        res.status(201).json({
            count,
            posts
        })
    } catch (error) {
        console.error(error)
        next(error)
    }
})

module.exports = router