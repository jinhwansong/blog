const passport = require("passport")
const {Strategy:LocalStrategy} = require("passport-local")
const bcrypt = require("bcrypt")
const {User} = require("../models")

module.exports=()=>{
    passport.use(new LocalStrategy({
        // 아이디에 해당되는 칸
        usernameField: 'email',
        // 비밀번호에 해당되는 칸
        passwordField: 'password',

    }, async(email, password,done) => {
        try {
            const exUser = await User.findOne({
                where: { email }
            })
            if (!exUser) {
                // 서버에러 , 성공유무 , 실패시 메시지
                return done(null, false, {
                    reason: "존재하지 않는 이메일입니다."
                })
            }
            // 비밀번호 
            const result = await bcrypt.compare(password, exUser.password);
            // 성공시
            if (result) {
                return done(null, exUser)
            }
            //아이디에 해당하는 비밀번호가 없을시
            return done(null, false, {
                reason: "비밀번호가 틀렸습니다."
            })
        } catch (error) {
            // 서버에서 나는 에러 
            console.error(error)
            return done(error)
        }
    }))
}