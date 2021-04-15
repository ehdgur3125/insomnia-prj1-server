const models = require("../../models");

module.exports = async (req, res) => {
  try {
    const userId = req.userId;
    if (userId < 0) throw "Invalid access";
    const user = await models.User.findByPk(userId, {
      attributes: ["email", "address", "phone"],
    });
    res.send(user);
  } catch (e) {
    console.log(e.name);
    res.status(400).send(e.name);
  }
};
