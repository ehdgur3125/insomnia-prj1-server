const models = require("../../models");

module.exports = async (req, res) => {
  try {
    const userId = req.userId;
    if (userId < 0) throw "Invalid access";
    const t = await models.sequelize.transaction();
    try {
      const cart = await models.Order.findOne({
        where: {
          userId: userId,
          state: "inCart",
        },
        transaction: t
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
            transaction: t
          }
        );
      }
      await t.commit();
    }
    catch (e) {
      await t.rollback();
      throw e;
    }
    res.send({
      message: "success",
    });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
