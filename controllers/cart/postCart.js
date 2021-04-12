const models = require("../../models");
const { getId } = require("../modules");

module.exports = async (req, res) => {
  try {
    const userId = getId(req);
    const promiseOption = models.Option.findByPk(req.body.params.optionId, {
      include: {
        model: models.Item,
        attributes: ["name"],
      },
    });
    const promiseCart = models.Order.findOrCreate({
      where: {
        userId: userId,
        state: "inCart",
      },
    });
    const [cart] = await promiseCart;
    if (!cart || Object.keys(cart).length === 0) throw "unpredicted error";
    const option = await promiseOption;
    if (!option || Object.keys(option).length === 0) throw "no such option";
    const [, created] = await models.ListItem.findOrCreate({
      where: {
        orderId: cart.id,
        optionId: req.body.params.optionId,
      },
      defaults: {
        quantity:
          req.body.params.quantity === undefined ? 1 : req.body.params.quantity,
        price: option.price,
        itemName: option.Item.name,
        optionText: option.text,
      },
    });
    if (!created) throw "already in cart";
    res.send({
      message: "success",
    });
  } catch (e) {
    console.log(e);
    if (e.name === "TokenExpiredError") res.status(401).send(e);
    else res.status(400).send(e);
  }
};
