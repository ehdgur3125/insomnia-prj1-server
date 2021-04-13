const models = require("../../models");

module.exports = async (req, res) => {
  const userId = req.userId;
  if (userId < 0) throw "Invalid access";
  const cart = await models.Order.findOne({
    where: {
      userId: userId,
      state: "inCart",
    },
  });
  if (!cart || Object.keys(cart).length === 0) throw "unpredicted error";
  await models.ListItem.destroy({
    where: {
      orderId: cart.id,
      optionId: req.params.optionId,
    },
  });
  res.send({
    message: "success",
  });
};
