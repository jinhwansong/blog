module.exports = (sequelize, DateTypes) => {
    // 해시태그테이블 생성
    const Hashtag = sequelize.define("Hashtag", {
        hashtag: {
            type: DateTypes.TEXT,
            allowNull: false,
        },
    }, {
        charser: "utf8",
        collate: "utf8_general_ci"
    })
    Hashtag.associate = (db) => {
        // 하나의 해시태그는 여러개의 게시물에 속할수 잇다.
        db.Hashtag.belongsToMany(db.Post,{
            through: "PostHashtag"
        })
        // 하나의 해시태그는 여러개의 카테고리에 속할수 잇다.
        db.Hashtag.belongsToMany(db.Categore,{
            through: "CategoreHashtag"
        })
    }
    return Hashtag
}