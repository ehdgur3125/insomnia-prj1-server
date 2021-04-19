const models = require("../../models");

module.exports = async (req, res) => {
  try {
    const userId = req.userId;
    if (userId < 0) throw "Invalid access";
    const newData = {};
    if (req.body.phone) newData.phone = req.body.phone;
    if (req.body.address) newData.address = req.body.address;
    await models.User.update(newData, {
      where: {
        id: userId,
      },
    });
    res.send("success");
  } catch (e) {
    console.log(e.name);
    res.status(400).send(e.name);
  }
};
