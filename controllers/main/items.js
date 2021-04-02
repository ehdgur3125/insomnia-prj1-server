const models=require('../../models');

module.exports=async(req,res)=>{
  //if(req.params.categoryId)
  try{
    const items=await models.Item.findAll({
      attributes:[
        ["id","itemId"],
        "name",
        [models.Sequelize.literal(`(select count(*) from Likes where Likes.itemId=Item.id)`),"likes"],
        [models.Sequelize.literal(`(select sum(quantity) from ListItems join Options on ListItems.optionId=Options.id where Options.itemId=Item.id)`),'purchased'],
        [models.Sequelize.literal(`(select max(price) from Options where Options.itemId=Item.id)`),'max'],
        [models.Sequelize.literal(`(select min(price) from Options where Options.itemId=Item.id)`),'min'],
      ],
      include:(req.params.categoryId)?[{
        model:models.Category,
        attributes:[],
        require:true,
        where:{
          id:req.params.categoryId
        }
      }]:null,
      /*
      include:[{
        model:models.User,
        require:false
      },{
        model:models.Option,
        include:models.ListItem
      }]
      */
    });
    res.send({
      data:{
        items/*:item.map(x=>{
          const [maxPrice,minPrice]=x.Options.reduce((acc,y)=>{
            return [Math.max(acc[0],y.price),Math.min(acc[1],y.price)]},
            [x.Options[0].price,x.Options[0].price]);
          return {
            itemId:x.id,
            name:x.name,
            likes:x.Users.length,
            maxPrice,
            minPrice
          }
        })*/
      }
    });
  }
  catch(e){
    res.status(400).send(e);
  }
}