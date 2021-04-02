const express=require('express');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const router=require('./routes');
const dotenv=require("dotenv");
dotenv.config();

const app=express();
const port=4000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const corsed=cors({
  origin:"localhost:3000",
  method:['GET','POST','UPDATE','DELETE','OPTION'],
  credentials:true
});

app.use(corsed);
app.use(cookieParser());
app.use(router);
app.options(corsed);

app.get('/',(req,res)=>{res.send("Hello, World!")});

app.listen(port,()=>{
  console.log(`server on ${port}`);
});