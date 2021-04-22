const models = require("../../models");

module.exports = async (req, res) => {
  try {
    const userId = req.userId;
    if (userId < 0) throw "Invalid access";
    const orders = await models.Order.findAll({
      where: {
        userId,
        state: {
          [models.Sequelize.Op.ne]: "inCart",
        },
      },
      attributes: ["state", "id", "createdAt"],
      include: models.ListItem,
    });
    res.send({
      orders: orders.map((order) => {
        return {
          orderId: order.id,
          state: order.state,
          createdAt: order.createdAt,
          total: order.ListItems.reduce(
            (acc, listItem) => acc + listItem.price * listItem.quantity,
            0
          ),
          summary: `${order.ListItems[0].itemName}${order.ListItems.length > 1 ? ` 외 ${order.ListItems.length - 1}건` : ""}`,
          img: `img/big/${order.ListItems[0].itemName}/${order.ListItems[0].optionId}`
        };
      }),
    });
  } catch (e) {
    console.log(e.name);
    res.status(400).send(e.name);
  }
};
