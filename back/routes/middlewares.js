// 로그인 안한사람꺼
exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next()
    }else{
        res.status(401).send("로그인이 필요합니다.")
    }
}

// 로그인 한사람꺼
exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next()
    } else {
        res.status(401).send("로그인 하지 않은 사용자만 접근 가능합니다.")
    }
}