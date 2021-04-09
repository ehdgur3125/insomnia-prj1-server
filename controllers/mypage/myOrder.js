const models=require('../../models');
const {getId}=require('../modules');

module.exports=async(req,res)=>{
  try{
    const userId=getId(req);
    const order=await models.Order.findByPk(req.params.orderId,{
      attributes:["userId","state","id","createdAt"],
      include:{
        model:models.ListItem,
        include:models.Option
      }
    });
    if(order.userId!==userId) throw `invalid access`;
    res.send({
      order:{
        orderId:order.id,
        state:order.state,
        createdAt:order.createdAt,
        total:order.ListItems.reduce((acc,listItem)=>acc+listItem.price*listItem.quantity,0),
        listItems:order.ListItems.map(listItem=>{
          return {
            itemId:listItem.Option.itemId,
            itemName:listItem.itemName,
            optionId:listItem.optionId,
            quantity:listItem.quantity,
            price:listItem.price,
            optionText:listItem.optionText
          }
        })
      }
    });
  }
  catch(e){
    console.log(e);
    if(e.name==='TokenExpiredError') res.status(401).send(e);
    else res.status(400).send(e);
  }
}