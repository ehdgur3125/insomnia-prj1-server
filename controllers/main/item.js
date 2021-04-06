const models=require('../../models');
const {getId}=require('../modules');
module.exports=async(req,res)=>{
  try{
    const item=await models.Item.findByPk(req.params.itemId,{
      attributes:[
        'id',
        'name',
        'text'//,
        //[models.Sequelize.literal(`(select COUNT(*) from Likes where Likes.itemId=${req.params.itemId})`),'likes'],
        //[models.Sequelize.literal(`(select SUM(quantity) from ListItems join Options on ListItems.optionId=Options.id where Options.itemId=${req.params.itemId})`),'purchases']
      ],
      include:[{
        model:models.User,
        require:false
      },{
        model:models.Option,
        attributes:['id','text','price'],
        include:{
          model:models.ListItem,
          include:models.Order
        }
      }],
      order:[[models.Option,'id','asc']]
    });
    let userId;
    if(req.headers['authorization']){
      console.log(req.headers['authorization']);
      userId=getId(req);
    }
    res.send({
      item:{
        itemId:item.id,
        name:item.name,
        text:item.text,
        options:item.Options.map(option=>{
          return {
            optionId:option.id,
            text:option.text,
            price:option.price,
            inCart:(userId)?option.ListItems.some(listItem=>listItem.Order.userId===userId && listItem.Order.state==='inCart'):false
          }
        }),
        likes:item.Users.length,
        liked:(userId)?item.Users.some(user=>user.id===userId):false,
        purchases:item.Options.reduce((acc1,option)=>acc1+option.ListItems.filter(listItem=>listItem.Order.state!=='inCart').reduce((acc2,listItem)=>acc2+listItem.quantity,0),0)
      }
    });
  }
  catch(e){
    console.log(e);
    res.status(400).send(e);
  }
}