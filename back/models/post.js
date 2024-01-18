module.exports = (sequelize, DataTyes) => {
    const Post = sequelize.define("Post", { // Mysql은 users 테이블 생성
        // 게시물 정보
        content: {
            type: DataTyes.TEXT, // 무제한
            allowNull: false,
        },
    }, {
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci" // 한글저장
    });
    // 엑셀모양을 잡아준다.
    Post.associate = (db) => {
        // 게시물은 작성자에게 속해있다.
        db.Post.belongsTo(db.User)
        // 게시물에는 많은 댓글을 작성할수 있다.
        db.Post.hasMany(db.Comment)
        // 게시물에는 많은 이미지을 작성할수 있다.
        db.Post.hasMany(db.Image)
        // 여러 개시물에 해시태그를 넣을수 잇고 해시태그로 그 게시물을 불러올수 잇으니 다대다 관계이다.
        db.Post.belongsToMany(db.Hashtag, {
            through: "PostHashtag"
        })

         // 이거는 게시물의 좋아요
         db.Post.belongsToMany(db.User, {
            through: "Like", // 중간 관계테이블 이름을 Like로 설정햇다.
            as: "Liked" // 좋아요를 누른 게시물
        })
        db.Post.belongsTo(db.Post,{as:"Retweet"})
    }
    return Post
}