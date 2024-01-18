// 인덱스에서 require한다 ㅎㅎ

module.exports = (sequelize, DataTyes) => {
    const User = sequelize.define("User",{ // Mysql은 users 테이블 생성
        // 여기에는 회원가입시 프론트에서 주는 정보
        email:{
            // 스트링이여야하고 30글자 이내여야한다.
            type:DataTyes.STRING(30),
            allowNull:false, // 필수 true면 선택이다.
            unique:true, // 중복이 되면 안되는 값이다.
        },
        nickname:{
            type: DataTyes.STRING(30),
            allowNull: false, // 필수 true면 선택이다.
            unique: true, // 중복이 되면 안되는 값이다.
        },
        password:{
            type: DataTyes.STRING(100),
            allowNull: false // 필수 true면 선택이다.
        }

        // type에서 많이 쓰는거 STRING TEXT BOOLEAN INTEGER FLOAT DATETIME
    },{
        charset:"utf8",
        collate:"utf8_general_ci" // 한글저장
    });
    // 엑셀모양을 잡아준다.
    User.associate = (db) => {
        // 한사람이 많은 게시물을 갖을수 있다.
        db.User.hasMany(db.Post)
        db.User.hasMany(db.Comment)
        // 이거는 게시물의 좋아요
        db.User.belongsToMany(db.Post, {
            through: "Like", // 중간 관계테이블 이름을 Like로 설정햇다.
            as:"Likers" // 좋아요를 누른 사람들
        })
        db.User.belongsToMany(db.User, {
            through: "Follow", // 팔로우 하고 잇는사람들
            as: "Followers", // 팔로우 하고 잇는사람들
             foreignKey: "FollowingId" // 찾는 기준점 (팔로잉 아이디 그니까 나~)
        })
        db.User.belongsToMany(db.User, {
            through: "Follow", // 팔로잉 하고 잇는사람들
            as: "Followings", // 팔로잉 하고 잇는사람들
             foreignKey: "FollowerId" // 찾는 기준점 (팔로우 아이디 그니까 나~)
        })

    }
    return User
}