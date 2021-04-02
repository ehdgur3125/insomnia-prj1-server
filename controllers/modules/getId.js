const jwt=require('jsonwebtoken');

module.exports=(req)=>{
  const auth=req.headers['authorization'];
  if(auth===undefined){
    throw 'not authorized';
  }
  try{
    const {userId}=jwt.verify(auth.split(' ')[1].process.env.ACCSALT);
    return userId;
  }
  catch(e){
    throw e;
  }
}