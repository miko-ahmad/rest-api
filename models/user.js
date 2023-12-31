'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Game, {
        foreignKey: 'userId'
      })
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    totalScore: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};