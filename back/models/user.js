module.exports = (sequelize, DateTypes) => {
    // user테이블 생성
    const User = sequelize.define("User", {
        email:{
            type: DateTypes.STRING(30),
            // 필수값 
            allowNull:false,
            // 중복되면 안되는 값 
            unique:true,
        }, 
        name: {
            type: DateTypes.STRING(10),
            // 필수값 
            allowNull: false,
            // 중복되면 안되는 값 
            unique: true,
        }, 
        nickName: {
            type: DateTypes.STRING(30),
            // 필수값 
            allowNull: false,
            // 중복되면 안되는 값 
            unique: true,
        },
        password: {
            type: DateTypes.STRING(30),
            // 필수값 
            allowNull: false,
            // 중복되면 안되는 값 
            unique: true,
        },
        profileImage: {
            type: DateTypes.STRING(200),
            // 필수값 아님 왜냐 마이페이지에서 등록시킬꺼라서.
            allowNull: true,
        },
    },{
        charset: "utf8",
        collate: "utf8_general_ci"
    });
    User.associate=(db)=>{
        // 유저는 게시글을 여러개 갖을수 잇다.
        db.User.hasMany(db.Post)
        // 유저는 댓글을 여러개 쓸수 잇다.
        db.User.hasMany(db.Comment)
        // 유저는 게시물에 좋아요를 누를수 있다.
        db.User.belongsToMany(db.Post, {
            // 중간테이블 이름이 Like
            through: "Like",
            // 좋아요 한 게시물 안하면 여기 안속하겠지.
            as: "Likes"
        })
        // 유저는 여러 카테고리에다가 게시물을 쓸수 있다.
        db.User.hasMany(db.Categore)
    }
    return User
}