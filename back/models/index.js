
const Sequelize = require("sequelize")
const env = process.env.NODE_ENV || "development"
const config = require("../config/config")[env]


const db = {}
// Sequelize가 노드와 sql을 연결시켜준다.
const sequelize = new Sequelize(config.database, config.username, config.password, config)

// 테이블짜놓은거 꺼내옴.
db.Comment = require("./comment")(sequelize, Sequelize)
db.Categore = require("./categore")(sequelize, Sequelize)
db.Hashtag = require("./hashtag")(sequelize, Sequelize)
db.Image = require('./image')(sequelize, Sequelize)
db.Post = require('./post')(sequelize, Sequelize)
db.User = require('./user')(sequelize, Sequelize)


// db관계짜주는거
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;