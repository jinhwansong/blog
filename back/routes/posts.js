const express = require("express")
const {
    Post,
    Sequelize,
    Hashtag,
    PostView,
    Image,
    User,
} = require("../models")
const {Op} = require("sequelize")
const router = express.Router()

router.get("/", async (req, res, next) => {
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
                through: {
                    attributes: [] // 중간 테이블의 추가 속성을 가져오지 않도록 비웁니다.
                }
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
            // 시퀄라이즈 모델 객체를 자바스크립트로 변경
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
            count, posts
        })
    } catch (error) {
        console.error(error)
        next(error)
    }
})
router.get("/recentPost", async (req, res, next) => {
    try {
        const time = new Date();
        const week = new Date(time.getTime() - 7 * 24 * 60 * 60 * 1000)
        const month = new Date(time.getTime() - 30 * 24 * 60 * 60 * 1000)
        const date = parseInt(req.query.time) === 7 ? week : month
        const post = await Post.findAll({
            where: {
                createdAt: {
                    [Op.gte]: date,
                },
                view: {
                    [Op.gt]: 0,
                }
            },
            limit: 5,
            include: [{
                model: Hashtag,
                attributes: ["hashtag"],
                through: {
                    attributes: [] // 중간 테이블의 추가 속성을 가져오지 않도록 비웁니다.
                }
            }, {
                model: Image,
                attributes: ["src"],
            }],
            attributes: [
                "id",
                "title",
                "view",
            ],
            order: [
                ["view", "DESC"]
            ]
        })
        const posts = post.map((post) => {
            // 시퀄라이즈 모델 객체를 자바스크립트로 변경
            const format = post.toJSON()
            format.hashtag = format.Hashtags.map((tag) => tag.hashtag)
            format.src = format.Images.map((img) => img.src).join("")
            delete format.Images;
            delete format.Hashtags;
            return format;
        })
        res.status(201).json(posts)
    } catch (error) {
        console.error(error)
        next(error)
    }
})
router.get("/:postId",async(req,res,next)=>{
    try {
        const date = new Date()
        const ip = req.ip
        const postId = req.params.postId
        const week = new Date(date.getTime() - 3 * 60 * 1000)

        await PostView.destroy({
            where: {
                viewAt: {
                    [Sequelize.Op.lt]: week,
                },
            },
        });
        const PostViews = await PostView.findOne({
            where:{
                address:ip,
                PostId: postId,
                viewAt:{
                     [Sequelize.Op.gt]: new Date(Date.now() - 60 * 1000),
                }
            }
        })
        // 해당 게시물에 대해 아무 정보가 없을경우
        if (!PostViews) {
            await Post.increment("view", {
                where: {
                    id: req.params.postId
                }
            })
            await PostView.create({
                address: ip,
                viewAt: date,
                PostId:postId
            });
        }
        const post = await Post.findOne({
            where: {
                id: postId
            }, 
            include: [{
                model: Hashtag,
                attributes: ["hashtag"],
                through: {
                    attributes: [] // 중간 테이블의 추가 속성을 가져오지 않도록 비웁니다.
                }
            }, {
                model: User,
                attributes: ["nickName"],
            }],
            attributes: [
                "id",
                "content",
                "title",
                "createdAt",
                "view",
                // 좋아요 수
                [Sequelize.literal("(SELECT COUNT(*) FROM `Like` WHERE `Like`.`postId` = `Post`.`id`)"), "count"],
                
            ]
        })
        if (!post) {
            return res.status(403).send("존재하지 않는 게시글 입니다.")
        }   
        
        const formatPost = (post) => {
            const format = post.toJSON()
            format.hashtag = format.Hashtags.map((tag) => tag.hashtag)
            format.nickname = format.User.nickName
            delete format.Hashtags;
            delete format.User;
            return format;
        }
        const posts = formatPost(post);
        

        res.status(201).json(posts)
    } catch (error) {
        console.error(error)
        next(error)
    }
})


module.exports = router
