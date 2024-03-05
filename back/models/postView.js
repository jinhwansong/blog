module.exports = (sequelize, DataTypes) => {
    // user테이블 생성
    const PostView = sequelize.define("PostView", {
        address: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        viewAt:{
            type: DataTypes.DATE,
            allowNull: false,
        }
    }, {
        charset: "utf8",
        collate: "utf8_general_ci"
    });
    PostView.associate = (db) => {
        db.PostView.belongsTo(db.Post)
    }
    return PostView
}