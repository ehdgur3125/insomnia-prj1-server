'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Item, { foreignKey: 'itemId' });
      this.belongsTo(models.User, { foreignKey: 'userId' });
    }
  };
  Review.init({
    itemId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    grade: DataTypes.INTEGER,
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};