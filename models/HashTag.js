const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('HashTag', {
    hashIdx: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userIdx: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'userIdx'
      }
    },
    hashtag: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'HashTag',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "hashIdx" },
          { name: "userIdx" },
        ]
      },
      {
        name: "FK_User_TO_HashTag_1",
        using: "BTREE",
        fields: [
          { name: "userIdx" },
        ]
      },
    ]
  });
};
