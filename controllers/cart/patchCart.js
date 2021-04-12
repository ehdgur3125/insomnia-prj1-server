const models = require("../../models");
const { getId } = require("../modules");

module.exports = async (req, res) => {
  try {
    const userId = getId(req);
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
    if (e.name === "TokenExpiredError") res.status(401).send(e);
    else res.status(400).send(e);
  }
};
