'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Option extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Item,{foreignKey:'itemId',onDelete:"CASCADE"});
      this.belongsTo(models.ListItem);
    }
  };
  Option.init({
    text: DataTypes.STRING,
    itemId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    state: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Option',
  });
  return Option;
};