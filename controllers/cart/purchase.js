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
    await models.Order.update(
      {
        state: "paying",
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
    res.send("success");
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
