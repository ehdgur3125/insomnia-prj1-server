const models = require("../../models");
const { sendItems, findItems } = require("../modules");

module.exports = async (req, res) => {
  try {
    const userId = req.userId;
    if (userId < 0) throw "Invalid access";
    const myLikes = await findItems([{
      model: models.User,
      require: true,
      where: {
        id: userId
      }
    }]);
    // const myLikes = await models.User.findByPk(userId, {
    //   include: {
    //     model: models.Item,
    //     attributes: [
    //       "id",
    //       "name", //,
    //       //[models.Sequelize.literal(`(select count(*) from Likes where Likes.itemId=Items.id)`),'likes'],
    //       //[models.Sequelize.literal(`(select sum(quantity) from ListItems join Options on ListItems.optionId=Options.id where Options.itemId=Items.id)`),'purchases']
    //     ],
    //     include: [
    //       {
    //         model: models.User,
    //         attributes: ["id"],
    //         require: false,
    //       },
    //       {
    //         model: models.Option,
    //         include: {
    //           model: models.ListItem,
    //           attributes: ["quantity"],
    //         },
    //       },
    //       {
    //         model: models.Review,
    //         require: false
    //       }
    //     ],
    //   },
    // });
    sendItems(req, res, myLikes);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
