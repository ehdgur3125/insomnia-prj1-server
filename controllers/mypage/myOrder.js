const models=require('../../models');
const {getId}=require('../modules');

module.exports=async(req,res)=>{
  try{
    const userId=getId(req);
    const order=await models.Order.findByPk(req.params.orderId,{
      attributes:["userId","state","id","createdAt"],
      include:models.ListItem
    });
    if(order.userId!==userId) throw `invalid access`;
    console.log(order);
    res.send({
      order:{
        orderId:order.id,
        state:order.state,
        createdAt:order.createdAt,
        total:order.ListItems.reduce((acc,listItem)=>acc+listItem.price*listItem.quantity,0),
        listItems:order.ListItems.map(listItem=>{
          return {
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
    res.status(400).send(e);
  }
}