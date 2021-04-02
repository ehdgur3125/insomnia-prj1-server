'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User,{through:'Like',foreignKey:'itemId',otherKey:'userId'});
      this.belongsToMany(models.Category,{through:'CategoryItem',foreignKey:'itemId',otherKey:'categoryId'});
      this.hasMany(models.Option,{foreignKey:'itemId',onDelete:"CASCADE"});
    }
  };
  Item.init({
    name: DataTypes.STRING,
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};