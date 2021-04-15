const models = require("../../models");

module.exports = async (req, res) => {
  try {
    const userId = req.userId;
    if (userId < 0) throw "Invalid access";
    const cart = await models.Order.findOne({
      where: {
        userId: userId,
        state: "inCart",
      },
    });
    if (!cart || Object.keys(cart).length === 0) throw "Not make cart yet";
    else {
      await models.ListItem.update(
        {
          quantity: req.body.params.quantity,
        },
        {
          where: {
            orderId: cart.id,
            optionId: req.body.params.optionId,
          },
        }
      );
    }
    res.send({
      message: "success",
    });
  } catch (e) {
    console.log(e.name);
    res.status(400).send(e.name);
  }
};
