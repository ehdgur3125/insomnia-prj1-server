const express=require('express');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const router=require('./routes');
const dotenv=require("dotenv");
dotenv.config();

const app=express();
const port=3000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const corsed=cors({
  origin:"http://localhost:8080",
  method:['GET','POST','PATCH','DELETE','OPTION'],
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