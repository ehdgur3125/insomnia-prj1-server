const models=require('../../models');

module.exports=async(req,res)=>{
  //if(req.params.categoryId)
  try{
    const item=await models.Item.findAll();
    res.send({
      data:{
        itemId:item.id,
        name:item.name
      }
    });
  }
  catch(e){
    res.status(400).send(e);
  }
}