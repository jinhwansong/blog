module.exports = (sequelize, DataTyes) => {
    const Image = sequelize.define("Image", { // Mysql은 users 테이블 생성
        // 게시글에 들어있는 이미지
        src: {
             type: DataTyes.STRING(200), // 무제한
            allowNull: false,
        },
    }, {
        charset: "utf8",
        collate: "utf8_general_ci" // 한글저장
    });
    // 엑셀모양을 잡아준다.
    Image.associate = (db) => {
        // 이미지는 게시물에게 속해있다.
        db.Image.belongsTo(db.Post)
    }
    return Image
}