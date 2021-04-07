const models=require('../../models');
const {getId}=require('../modules');

module.exports=async(req,res)=>{
  try{
    const userId=getId(req);
    const myLikes=await models.User.findByPk(userId,{
      include:{
        model:models.Item,
        attributes:['id','name'//,
          //[models.Sequelize.literal(`(select count(*) from Likes where Likes.itemId=Items.id)`),'likes'],
          //[models.Sequelize.literal(`(select sum(quantity) from ListItems join Options on ListItems.optionId=Options.id where Options.itemId=Items.id)`),'purchases']
        ],
        include:[
          {
            model:models.User,
            attributes:['id'],
            require:false
          },
          {
            model:models.Option,
            include:{
              model:models.ListItem,
              attributes:['quantity']
            }
          }
        ]
      }
    });    
    res.send({
      items:myLikes.Items.map(item=>{
        return {
          itemId:item.id,
          name:item.name,
          likes:item.Users.length,
          purchases:item.Options.reduce((acc1,option)=>
            acc1+option.ListItems.reduce((acc2,listItem)=>
              acc2+listItem.quantity,0),0)
        };
      })
    });
  }
  catch(e){
    console.log(e);
    if(e.name==='TokenExpiredError') res.status(401).send(e);
    else res.status(400).send(e);
  }
}