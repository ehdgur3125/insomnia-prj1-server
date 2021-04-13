"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "userId" });
      this.hasMany(models.ListItem, {
        foreignKey: "orderId",
        onDelete: "CASCADE",
      });
    }
  }
  Order.init(
    {
      userId: DataTypes.INTEGER,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      account: DataTypes.STRING,
      state: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
