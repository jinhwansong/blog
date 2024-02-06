module.exports = (sequelize, DateTypes) => {
    // user테이블 생성
    const Post = sequelize.define("Post", {
        content: {
            type: DateTypes.TEXT,
            allowNull: false,
        },
        title: {
            type: DateTypes.TEXT,
            allowNull: false,
        },
    }, {
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci"

    })
    Post.associate = (db) => {
        // 많은 게시물은 유저에 속해있다.
        db.Post.belongsTo(db.User)
        // 많은 게시물은 카테고리에 속해있다.
        db.Post.belongsTo(db.Categore);
        // 게시물은 많은 댓글을 갖을수 있다.
        db.Post.hasMany(db.Comment)
        // 게시물은 많은 이미지를 갖을수 있다.
        db.Post.hasMany(db.Image)
        // 게시물은 많은 해시태그를 갖을수 있다.
        // 해시태그는 많은 게시물을 가져올수 있다.
        db.Post.belongsToMany(db.Hashtag, {
            // 중간테이블 이름이 PostHashtag
            through: "PostHashtag"
        })
         // 게시물은 많은 좋아요를 갖을수 있다.
         db.Post.belongsToMany(db.User, {
            // 중간테이블 이름이 Like
            through: "Like",
            // 좋아요 한 게시물 안하면 여기 안속하겠지.
            as: "Liked"
         })
    }
    return Post
}