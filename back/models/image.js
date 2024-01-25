module.exports = (sequelize, DateTypes) => {
    // 해시태그테이블 생성
    const Image = sequelize.define("Image", {
        src: {
            type: DateTypes.STRING(200),
            allowNull: false,
        },
    }, {
        charset: "utf8mb4",
            collate: "utf8mb4_general_ci"

    })
    Image.associate = (db) => {
        db.Image.belongsTo(db.Post)
    }
    return Image
}