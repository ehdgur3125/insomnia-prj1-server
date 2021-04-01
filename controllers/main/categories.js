const models=require("../../models");
module.exports=(req,res)=>{
  const categories=await models.Category.findAll({
    attributes:[],
    include:models.Item,
    group:'id'
  })
  res.send('dummy');
}