const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    userIdx: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    userName: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    birth: {
      type: DataTypes.CHAR(11),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(35),
      allowNull: true
    },
    phoneNum: {
      type: DataTypes.CHAR(11),
      allowNull: true
    },
    sex: {
      type: DataTypes.CHAR(11),
      allowNull: true
    },
    updateAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'User',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userIdx" },
        ]
      },
    ]
  });
};
