const models = require("../../models");

module.exports = async (req, res) => {
  try {
    const userId = req.userId;
    if (userId < 0) throw "Invalid access";
    let { address, phone, account } = req.body.params;
    if (!address || !phone || !account) {
      const user = models.User.findByPk(userId);
      address = address || user.address;
      phone = phone || user.phone;
      if (!account) throw "more informations necessary";
    }
    const order = await models.Order.findOne({
      where: {
        state: "inCart",
        userId,
      },
      attributes: [["id", "orderId"]],
      include: {
        model: models.ListItem,
      },
    });
    await models.Order.update(
      {
        state: "payed",
        address: req.body.address,
        phone: req.body.phone,
        account: req.body.account,
      },
      {
        where: {
          userId: userId,
          state: "inCart",
        },
      }
    );
    res.send({
      orderId: order.orderId,
      total: order.ListItems.reduce(
        (acc, listItem) => acc + listItem.quantity * listItem.price,
        0
      ),
    });
  } catch (e) {
    console.log(e.name);
    res.status(400).send(e.name);
  }
};
