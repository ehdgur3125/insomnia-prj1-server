const models = require("../../models");

module.exports = async (req, res) => {
  try {
    const userId = req.userId;
    if (userId < 0) throw "Invalid access";
    const newData = {};
    if (req.body.params.phone) {
      if (/^\d{3}-\d{3,4}-\d{4}$/.test(req.body.params.phone)) {
        newData.phone = req.body.params.phone;
      }
      else {
        throw "전화번호의 양식을 다시 확인해주세요."
      }
    }
    if (req.body.params.address) newData.address = req.body.params.address;
    await models.User.update(newData, {
      where: {
        id: userId,
      },
    });
    res.send("success");
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
