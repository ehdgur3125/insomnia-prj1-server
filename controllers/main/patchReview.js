const models = require("../../models");

module.exports = async (req, res) => {
  try {
    const userId = req.userId;
    if (userId < 0) throw "Invalid access";
    const { reviewId, grade, text } = req.body.params;
    await models.Review.update(
      { grade, text },
      {
        where: {
          id: reviewId
        }
      });
    res.send("success");
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
