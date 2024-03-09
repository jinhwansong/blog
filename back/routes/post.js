const express = require("express")
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const router = express.Router()
const {
    Post,
    Comment,
    Image,
    Hashtag,
} = require("../models")
const {
     isLoggedIn,
} = require("../routes/middlewares")
const { Sequelize } = require("sequelize")


try {
    // uploads폴더가 잇는지 확인
    fs.accessSync("uploads")
} catch (error) {
    //없으면 uploads생성

    fs.mkdirSync("uploads")
}

// 게시글 보냄
router.post("/", isLoggedIn, async (req, res, next) => {
    try {
        const hashtag = req.body.keywords
        const post = await Post.create({
            content: req.body.content,
            title: req.body.title,
            // 인증할때의 아이디
            UserId:req.user.id,
            CategoreId: req.body.CategoreId
        })
        if (hashtag){
            // 이렇게 하면 중복으로 해시태그가 된다.
            const result = await Promise.all(hashtag.map((tag)=>Hashtag.findOrCreate({
                where: {
                    hashtag: tag.toLowerCase()
                }
            })))
            // 중간테이블에 넣어야됨.
            await post.addHashtags(result.map((v)=>v[0]))
        }
        if(req.body.image){
            // 이미지가 2개 이상일떄
            if(Array.isArray(req.body.image)){
                const images = await Promise.all(req.body.image.map((v) => Image.create({
                    src: v
                })))
                await post.addImages(images)
            }else{
                const image = await Image.create({src:req.body.image})
                 await post.addImages(image)
            }
        }
        res.status(201).json(post)
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
// 게시글을 수정함
router.patch("/:postId", isLoggedIn, async (req, res, next) => {
    console.log(req.body)
    try {
        const hashtag = req.body.keywords
        const post = await Post.findOne({
            where: {
                id: req.params.postId,
                UserId: req.user.id
            },
        })
        if (!post) {
            return res.status(403).send("존재하지 않는 게시글 입니다.")
        }
        if (post.UserId !== req.user.id) {
            return res.status(403).send("다른 사용자의 글은 수정할 수 없습니다.")
        }
        await Post.update({
            content: req.body.content,
            title: req.body.title,
            // 인증할때의 아이디
            UserId: req.user.id,
            CategoreId: req.body.CategoreId
        }, {
            where: {
                id: req.params.postId,
                UserId: req.user.id
            }
        })
        if (hashtag) {
            // 이렇게 하면 중복으로 해시태그가 된다.
            const result = await Promise.all(hashtag.map((tag) => Hashtag.findOrCreate({
                where: {
                    hashtag: tag.toLowerCase()
                }
            })))
            // 중간테이블에 넣어야됨.
            await post.addHashtags(result.map((v) => v[0]))
        }
        if(req.body.image){
            if (Array.isArray(req.body.image)) {
                const images = await Promise.all(req.body.image.map((v) => Image.create({
                    src: v
                })))
                await post.addImages(images)
            } else {
                const image = await Image.create({
                    src: req.body.image
                })
                await post.addImages(image)
            }
        }
        res.status(201).send("게시물이 수정되었습니다.")
    } catch (error) {
        console.error(error)
        next(error)
    }
})

const upload = multer({
    // 일단 컴퓨터 스토리지에 올림
    storage: multer.diskStorage({
        // 나중에 s3로 변경할 예정
        destination(req,file,done){
            done(null,"uploads")
        },
        // 파일 이름
        filename(req,file,done){
            // 중복되는 파일이름을 곂치지 안게 하기 위해 
            // 업로드 시간을 파일 이름에 붙여서 업로드 시킨다.

            // 확장자 추출 ex) png
            const ext = path.extname(file.originalname)
            // 파일 이름 ex) pg
            const basename = path.basename(file.originalname,ext)
            // 저장시에 pg1234253524.png
            done(null, basename + "_"+new Date().getTime() + ext)
        }
    }),
    // 최대 20mb
    limits:{fileSize:20 * 1024 * 1024}
})

// 이미지 여러개 upload.array
// 이미지 한개 upload.single
// 그것도 아니다 upload.none

// 게시글 이미지 업로드용
// image가 키값임.
router.post("/images", isLoggedIn, upload.array("image"),  (req, res, next) => {
    res.json(req.files.map((v)=>v.filename))
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
            like: 1
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
             like: 0
         });
    } catch (error) {
        console.error(error)
        next(error)
    }
})

module.exports = router