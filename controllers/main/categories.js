const models=require("../../models");
module.exports=async(req,res)=>{
  try{
    const categories=await models.Category.findAll({
      attributes:[[models.sequelize.fn('COUNT',model.Sequelize.col('id')),'quantity']],
      include:[{
        model:models.Item,
        attributes:['name']
      }],
      group:'id'
    });
    res.send({
      categories:categories.map(x=>{
        return {
          name:x.Item.name,
          quantity:x.quantity
        };
      })
    });
  }
  catch(e){
    res.status(400).send(e);
  }
}