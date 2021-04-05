const models=require('../../models');
const {getId}=require('../modules');

module.exports=async(req,res)=>{
  try{
    const userId=getId(req);
    const myLikes=await models.User.findByPk(userId,{
      include:{
        model:models.Item,
        attributes:['id','name',
        [models.Sequelize.literal(`(select count(*) from Likes where Likes.itemId=Items.id)`),'likes'],
        [models.Sequelize.literal(`(select sum(quantity) from ListItems join Options on ListItems.optionId=Options.id where Options.itemId=Items.id)`),'purchases']
      ]}
    });    
    res.send({
      items:myLikes.Items.map(x=>{
        return {
          itemId:x.id,
          name:x.name,
          likes:x.dataValues.likes,
          purchases:x.dataValues.purchases
        };
      })
    });
  }
  catch(e){
    res.status(400).send(e);
  }
}