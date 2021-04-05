const models=require('../../models');

module.exports=async(req,res)=>{
  try{
    const item=await models.Item.findByPk(req.params.itemId,{
      attributes:[
        ['id','itemId'],
        'text',
        [models.Sequelize.literal(`(select COUNT(*) from Likes where Likes.itemId=${req.params.itemId})`),'likes'],
        [models.Sequelize.literal(`(select SUM(quantity) from ListItems join Options on ListItems.optionId=Options.id where Options.itemId=${req.params.itemId})`),'purchases']
      ],
      include:[{
        model:models.User,
        require:false
      },{
        model:models.Option,
        attributes:['id','text','price'],
        include:models.ListItem
      }]
    });
    res.send({
      item:{
        itemId:item.itemId,
        text:item.text,
        options:item.Options.map(option=>{
          return {
            optionId:option.id,
            text:option.text,
            price:option.price
          }
        }),
        likes:item.Users.length,
        purchases:item.Options.reduce((acc1,option)=>acc1+option.ListItems.reduce((acc2,listItem)=>acc2+listItem.quantity,0),0)
      }
    });
  }
  catch(e){
    console.log(e);
    res.status(400).send(e);
  }
}