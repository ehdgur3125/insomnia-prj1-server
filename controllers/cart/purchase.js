const models = require("../../models");

module.exports = async (req, res) => {
  try {
    const userId = req.userId;
    if (userId < 0) throw "Invalid access";
    let { address, phone } = req.body.params;
    if (!address || !phone) {
      const user = models.User.findByPk(userId);
      address = address || user.address;
      phone = phone || user.phone;
    }
    if (!/^\d{3}-\d{3,4}-\d{4}$/.test(phone)) {
      throw '전화번호의 양식을 확인해주세요';
    }
    await models.Order.update(
      {
        address,
        phone,
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
