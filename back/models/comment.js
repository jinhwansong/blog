module.exports = (sequelize, DataTyes) => {
    const Comment = sequelize.define("Comment", { // Mysql은 users 테이블 생성
        // 사용자 댓글
        content: {
             type: DataTyes.TEXT, // 무제한
            allowNull: false,
        },
    }, {
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci" // 한글저장
    });
    // 엑셀모양을 잡아준다.
    Comment.associate = (db) => {
        // 게시물에는 많은 댓글을 작성할수 있다.
        db.Comment.belongsTo(db.Post)
        // 작성자는 많은 게시물을 작성할수 있다.
        db.Comment.belongsTo(db.User)

    }
    return Comment
}