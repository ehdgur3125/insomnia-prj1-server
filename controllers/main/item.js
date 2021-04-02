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
      include:{
        model:models.Option,
        attributes:['id','text','price'],
        where:{
          state:"onSale"
        }
      }
    });
    res.send(item);
  }
  catch(e){
    res.status(400).send(e);
  }
}