const models = require("../../models");

module.exports = async (req, res) => {
  try {
    const userId = req.userId;
    if (userId < 0) throw "Invalid access";
    const user = await models.User.findByPk(userId, {
      attributes: ["username", "email", "address", "phone"],
    });
    res.send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
