module.exports = (sequelize, DateTypes) => {
    // 해시태그테이블 생성
    const Categore = sequelize.define("Categore", {
        categore: {
            type: DateTypes.STRING(200),
            allowNull: true,
            unique: true,
        },
    }, {
        charset: "utf8",
        collate: "utf8_general_ci"
    });
    Categore.associate = (db) => {
        // 하나의 카테고리에는 여러개의 게시물이 속해있다.
        db.Categore.hasMany(db.Post);
        // 여러개의 카테고리에는 여러개의 해시테그가 속해있다.
        db.Categore.belongsToMany(db.Hashtag,{
            through: "CategoreHashtag"
        })
        
    }
    return Categore
}