const models = require("../../models");

module.exports = async (req, res) => {
  try {
    const { itemId, begin, limit } = req.query;
    const reviews = await models.Review.findAll({
      where: { itemId },
      offset: Number(begin),
      limit: Number(limit),
      include: {
        model: models.User,
        attribute: ["username"]
      },
      order: [['updatedAt', 'desc']]
    });
    res.send(reviews.map(review => {
      return {
        text: review.text,
        grade: review.grade,
        updatedAt: review.updatedAt,
        username: review.User.username
      };
    }));
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
