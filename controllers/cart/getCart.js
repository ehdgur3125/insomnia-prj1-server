const models=require("../../models");
const {getId}=require('../modules');

module.exports=async(req,res)=>{
  try{
    const userId=getId(req);
    const order=await models.Order.findOne({
      where:{
        state:'inCart',
        userId
      },
      attributes:[["id","orderId"]],
      include:{
        model:models.ListItem,
        include:models.Option
      }
    });
    console.log(order);
    res.send({
      orderId:order.orderId,
      listItems:order.ListItems.map(listItem=>{
        return {
          optionId:listItem.optionId,
          quantity:listItem.quantity,
          optionText:listItem.optionText,
          price:listItem.price,
          itemId:listItem.Option.itemId
        }
      }),
      total:order.ListItems.reduce((acc,listItem)=>acc+listItem.quantity*listItem.price,0)
    });
  }
  catch(e){
    console.log(e);
    res.status(400).send(e);
  }
}