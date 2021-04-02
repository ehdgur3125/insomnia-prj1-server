const models=require('../../models');
const jwt=require('jsonwebtoken');
const passwordHash=require('password-hash');

module.exports=async(req,res)=>{
  try{
    const user=await user.findOne({
      where:{
        username:req.body.username
      }
    });
    if(!user || Object.keys(user).length===0) throw 'no such user';
    const verify=passwordHash.verify(req.body.password,user.password);
    if(!verify) throw "wrong password";
    const accessToken=jwt.sign({
      userId:user.id
    },process.env.ACCSALT,{
      expiresIn : '1h'
    });
    const refreshToken=jwt.sign({
      id:user.id
    },process.env.REFSALT,{
      expiresIn : '12h'
    });
    res.cookie('refreshToken',refreshToken);
    res.send({accessToken});
  }
  catch(e){
    res.status(400).send(e);
  }
}