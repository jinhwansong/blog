const express = require("express")
const {
    Post,
    Sequelize,
    Hashtag,
    User,
    Image,
} = require("../models");
const { Op } = require("sequelize");

const router = express.Router()


router.get("/:search", async (req, res, next) => {
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
             where: {
                //Op.like ~ 가 포함된 검색어 
                 [Op.or]: [{
                     title: {
                         [Op.like]: `%${req.params.search}%`
                     }
                 }, {
                     content: {
                         [Op.like]: `%${req.params.search}%`
                     }
                 }]
             },
            include: [{
                model: Hashtag,
                attributes: ["hashtag"],
               
            }, {
                model: Image,
                attributes: ["src"],
            }, {
                model: User,
                attributes: ["nickName"],
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
            format.content = format.content.replace(/<[^>]+>|<img.*?>/g, "");
            delete format.Images;
            delete format.User;
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