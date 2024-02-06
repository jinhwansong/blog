const passport = require("passport")
const local = require("./local")
const {User} = require("../models")

module.exports=()=>{
    // 로그인 정보를 프론트에서 받음
    passport.serializeUser((user,done)=>{
        done(null,user.id)
    })

    // 위에 프론트에서 받은 정보를 db에서 뒤짐
    passport.deserializeUser(async (id,done)=>{
       try {
        const user = await User.findOne({
            where: {
                id
            }
        })
        done(null,user)
        // 서버에러
       } catch (error) {
        console.error(error)
        done(error)
       }
    })
    local()
}