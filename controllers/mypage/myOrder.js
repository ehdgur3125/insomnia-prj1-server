const models = require("../../models");

module.exports = async (req, res) => {
  const userId = req.userId;
  if (userId < 0) throw "Invalid access";
  const order = await models.Order.findByPk(req.params.orderId, {
    attributes: ["userId", "state", "id", "createdAt"],
    include: {
      model: models.ListItem,
      include: models.Option,
    },
  });
  if (order.userId !== userId) throw `invalid access`;
  res.send({
    order: {
      orderId: order.id,
      state: order.state,
      createdAt: order.createdAt,
      total: order.ListItems.reduce(
        (acc, listItem) => acc + listItem.price * listItem.quantity,
        0
      ),
      listItems: order.ListItems.map((listItem) => {
        return {
          itemId: listItem.Option.itemId,
          itemName: listItem.itemName,
          optionId: listItem.optionId,
          quantity: listItem.quantity,
          price: listItem.price,
          optionText: listItem.optionText,
        };
      }),
    },
  });
};
