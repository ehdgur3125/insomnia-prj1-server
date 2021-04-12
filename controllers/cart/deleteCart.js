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
  } catch (e) {
    console.log(e);
    if (e.name === "TokenExpiredError") res.status(401).send(e);
    else res.status(400).send(e);
  }
};
