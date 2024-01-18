module.exports = (sequelize, DataTyes) => {
    const Hashtag = sequelize.define("Hashtag", { // Mysql은 users 테이블 생성
        // 게시글에 들어있는 해시태그
        name: {
             type: DataTyes.STRING(20), // 20글자 미만
            allowNull: false,
        },
    }, {
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci" // 한글저장
    });
    // 엑셀모양을 잡아준다.
    Hashtag.associate = (db) => {
        // 여러 개시물에 해시태그를 넣을수 잇고 해시태그로 그 게시물을 불러올수 잇으니 다대다 관계이다.
        db.Hashtag.belongsToMany(db.Post, {
            through: "PostHashtag"
        })
    }
    return Hashtag
}