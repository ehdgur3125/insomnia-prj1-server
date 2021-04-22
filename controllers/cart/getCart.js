const models = require("../../models");

module.exports = async (req, res) => {
  try {
    const userId = req.userId;
    if (userId < 0) throw "Invalid access";
    const [order, _] = await models.Order.findOrCreate({
      where: {
        state: "inCart",
        userId,
      },
      attributes: ["id"],
      include: {
        model: models.ListItem,
        include: models.Option,
      },
      order: [
        [models.ListItem, models.Option, "itemId", "asc"],
        [models.ListItem, "optionId", "asc"],
      ],
    });
    res.send({
      data: {
        orderId: order.id,
        listItems: order.ListItems
          ? order.ListItems.map((listItem) => {
            return {
              optionId: listItem.optionId,
              quantity: listItem.quantity,
              itemName: listItem.itemName,
              optionText: listItem.optionText,
              price: listItem.price,
              itemId: listItem.Option.itemId,
            };
          })
          : [],
        total: order.ListItems
          ? order.ListItems.reduce(
            (acc, listItem) => acc + listItem.quantity * listItem.price,
            0
          )
          : 0,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
