module.exports = (sequelize, DateTypes) => {
    // user테이블 생성
    const Comment = sequelize.define("Comment", {
        content: {
            type: DateTypes.TEXT,
            allowNull: false,
        }
    }, {
        charser: "utf8mb4",
        collate: "utf8mb4_general_ci"
    })
    Comment.associate = (db) => {
        // 유저는 댓글을 여러개 쓸수 잇다.
        db.Comment.belongsTo(db.User)
        // 게시물은 많은 댓글을 갖을수 있다.
        db.Comment.belongsTo(db.Post)
    }
    return Comment
}