const models = require("../../models");
const { getId } = require("../modules");

module.exports = async (req, res) => {
  try {
    const userId = getId(req);
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
    if (e.name === "TokenExpiredError") res.status(401).send(e);
    else res.status(400).send(e);
  }
};
