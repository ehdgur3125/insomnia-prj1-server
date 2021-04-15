const models = require("../../models");

module.exports = async (req, res) => {
  try {
    const userId = req.userId;
    if (userId < 0) throw "Invalid access";
    const t = await models.sequelize.transaction();
    try {
      const promiseOption = models.Option.findByPk(req.body.params.optionId, {
        include: {
          model: models.Item,
          attributes: ["name"],
        },
        transaction: t
      });
      const promiseCart = models.Order.findOrCreate({
        where: {
          userId: userId,
          state: "inCart",
        },
        transaction: t
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
        transaction: t
      });
      if (!created) throw "already in cart";
      res.send({
        message: "success",
      });
      t.commit();
    }
    catch (e) {
      t.rollback();
      throw e;
    }
  } catch (e) {
    console.log(e.name);
    res.status(400).send(e);
  }
};
