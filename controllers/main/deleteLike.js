const models = require("../../models");
const { getId } = require("../modules");

module.exports = async (req, res) => {
  try {
    const userId = getId(req);
    await models.Like.destroy({
      where: {
        userId,
        itemId: req.params.itemId,
      },
    });
    res.send("success");
  } catch (e) {
    if (e.name === "TokenExpiredError") res.status(401).send(e);
    else res.status(400).send(e);
  }
};
