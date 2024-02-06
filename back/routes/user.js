const express = require("express")
const {
    User, Post
} = require('../models');
const passport = require("passport")
const bcrypt = require("bcrypt")
const {
    isLoggedIn, isNotLoggedIn
} = require("./middlewares")
const router = express.Router()


//req - 프론트에서 데이터 준거
//res - 응답값

// 회원가입
router.post("/", isNotLoggedIn, async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 12)
        await User.create({
            email: req.body.email,
            name: req.body.name,
            nickName: req.body.nickName,
            password: hashedPassword,
            image: req.body.image ? req.body.image : null,
        })
        res.status(201).send("회원가입이 완료되셨습니다.") 
    } catch (error) {
        // 서버에서 나는 에러라서 프론트는 노상관
        console.error(error)
        next(error)
    }
})

// 아이디체크
router.post("/checkId", isNotLoggedIn,async(req, res, next) => {
    try {
        // db에 중복되는게 잇는지 없는지 확인부터 
        const exUser = await User.findOne({
            where: {
                email: req.body.email,
            }
        })
        // 중복이 되는게 있다고 하면 에러메시지 보낸다.
        if (exUser) {
            return res.status(403).send("이미 사용중인 아이디입니다.")
        }
        return res.status(201).send("사용가능한 아이디입니다.")
    } catch (error) {
        next(error)
    }
})

// 닉네임체크
router.post("/checkNick", async (req, res, next) => {
    try {
        const exNick = await User.findOne({
            where: {
                nickName: req.body.nickName,
            }
        })
        
        // 중복이 되는게 있다고 하면 에러메시지 보낸다.
        if (exNick) {
            return res.status(403).send("이미 사용중인 닉네임입니다.")
        }
        return res.status(201).send("사용가능한 닉네임입니다.")
    } catch (error) {
        next(error)
    }
})

// 로그인
router.post("/login", isNotLoggedIn, (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            console.error(err)
            return next(err)
        }
        if(info){
            // 401인증되지 않는
            return res.status(401).send(info.reason)
        }
        // 여기에 있는 user에 대한 정보를 passport.serializeUser의 user에 넘긴다.
        return req.login(user,async(loginErr)=>{
            // 패스포트에서 에러 나면
            if (loginErr){
                console.error(loginErr)
                return next(loginErr)
            }
            
            const fullUserInfo = await User.findOne({
                where:{id:user.id},
                // 원하는 정보만 받을때
                attributes:["nickName","image","email"],
                // 원치 않은 정보 빼고
                // attributes:{
                //     exclude:["password"]
                // }
                // 팔로워 같은 정보가 로그인시에 바로 필요하다 라고 하면 아래꺼 써
                include: [
                    {model:Post }
                ]

            })
            return res.status(200).json(fullUserInfo)
        })
    })(req,res,next)
})
// 로그아웃 
router.post("/logout", isLoggedIn,(req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err)
            return res.status(500).send("로그아웃 중 오류가 발생했습니다.")
        }
        req.session.destroy((err) => {
            if (err) {
                console.error(err)
                return res.status(500).send("로그아웃 중 오류가 발생했습니다.")
            }
            res.send('로그아웃 하셨습니다');
        })
    });
})

// 로그인 유지
router.get("/", async (req, res, next) => {
   try {
    // 로그인을 했을때
    if (req.user) {
        const fullUserInfo = await User.findOne({
                where:{id:req.user.id},
                attributes: ["nickName", "image", "email", "id", "name"],
            })
            return res.status(200).json(fullUserInfo)
    }else{
    // 로그인 안햇을때
        res.status(200).json(null)
    }
    
     
   } catch (error) {
        console.error(error)
        next(error)
   }
})

// 닉네임 수정
router.patch("/nickname", isLoggedIn, async (req, res, next) => {
    try {
        await User.update({
            nickName:req.body.nickName
        },{
            where:{id:req.user.id}
        })
        res.status(201).json({
            nickName: req.body.nickName
        })
    } catch (error) {
        console.error(error)
        next(error)
    }
})
// 비밀번호 확인
router.post("/passwordCheck", isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.user.id
            },
            attributes: ["password"]
        })
        // compare 비밀번호 비교
        const hashedPassword = await bcrypt.compare(req.body.password, user.password)
        if (!hashedPassword) {
             return res.status(401).send("비밀번호가 일치하지 않습니다.")
        }
        res.status(201).send("비밀번호가 일치합니다.")
    } catch (error) {
        console.error(error)
        next(error)
    }
})
// 비밀번호 수정
router.patch("/password", isLoggedIn, async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 12)
        await User.update({
            password: hashedPassword
        }, {
            where: {
                id: req.user.id
            }
        })
        res.status(201).send("비밀번호가 변경되었습니다.")
    } catch (error) {
        console.error(error)
        next(error)
    }
})


module.exports = router