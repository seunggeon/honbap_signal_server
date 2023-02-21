var DataTypes = require("sequelize").DataTypes;
var _BlackList = require("./BlackList");
var _HashTag = require("./HashTag");
var _Manner = require("./Manner");
var _Review = require("./Review");
var _SignalApply = require("./SignalApply");
var _Signaling = require("./Signaling");
var _User = require("./User");
var _UserLocation = require("./UserLocation");
var _UserProfile = require("./UserProfile");

function initModels(sequelize) {
  var BlackList = _BlackList(sequelize, DataTypes);
  var HashTag = _HashTag(sequelize, DataTypes);
  var Manner = _Manner(sequelize, DataTypes);
  var Review = _Review(sequelize, DataTypes);
  var SignalApply = _SignalApply(sequelize, DataTypes);
  var Signaling = _Signaling(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);
  var UserLocation = _UserLocation(sequelize, DataTypes);
  var UserProfile = _UserProfile(sequelize, DataTypes);

  Signaling.belongsToMany(Signaling, { as: 'userIdx_Signalings', through: Review, foreignKey: "signalIdx", otherKey: "userIdx" });
  Signaling.belongsToMany(Signaling, { as: 'signalIdx_Signalings', through: Review, foreignKey: "userIdx", otherKey: "signalIdx" });
  Signaling.belongsToMany(User, { as: 'userIdx_Users', through: SignalApply, foreignKey: "signalIdx", otherKey: "userIdx" });
  User.belongsToMany(Signaling, { as: 'signalIdx_Signaling_SignalApplies', through: SignalApply, foreignKey: "userIdx", otherKey: "signalIdx" });
  Review.belongsTo(Signaling, { as: "signalIdx_Signaling", foreignKey: "signalIdx"});
  Signaling.hasMany(Review, { as: "Reviews", foreignKey: "signalIdx"});
  Review.belongsTo(Signaling, { as: "userIdx_Signaling", foreignKey: "userIdx"});
  Signaling.hasMany(Review, { as: "userIdx_Reviews", foreignKey: "userIdx"});
  SignalApply.belongsTo(Signaling, { as: "signalIdx_Signaling", foreignKey: "signalIdx"});
  Signaling.hasMany(SignalApply, { as: "SignalApplies", foreignKey: "signalIdx"});
  BlackList.belongsTo(User, { as: "userIdx_User", foreignKey: "userIdx"});
  User.hasMany(BlackList, { as: "BlackLists", foreignKey: "userIdx"});
  HashTag.belongsTo(User, { as: "userIdx_User", foreignKey: "userIdx"});
  User.hasMany(HashTag, { as: "HashTags", foreignKey: "userIdx"});
  Manner.belongsTo(User, { as: "userIdx_User", foreignKey: "userIdx"});
  User.hasOne(Manner, { as: "Manner", foreignKey: "userIdx"});
  SignalApply.belongsTo(User, { as: "userIdx_User", foreignKey: "userIdx"});
  User.hasMany(SignalApply, { as: "SignalApplies", foreignKey: "userIdx"});
  Signaling.belongsTo(User, { as: "userIdx_User", foreignKey: "userIdx"});
  User.hasMany(Signaling, { as: "Signalings", foreignKey: "userIdx"});
  UserLocation.belongsTo(User, { as: "userIdx_User", foreignKey: "userIdx"});
  User.hasOne(UserLocation, { as: "UserLocation", foreignKey: "userIdx"});
  UserProfile.belongsTo(User, { as: "userIdx_User", foreignKey: "userIdx"});
  User.hasOne(UserProfile, { as: "UserProfile", foreignKey: "userIdx"});

  return {
    BlackList,
    HashTag,
    Manner,
    Review,
    SignalApply,
    Signaling,
    User,
    UserLocation,
    UserProfile,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
