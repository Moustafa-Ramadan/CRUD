const express=require("express");
const app=express();
const cors=require('cors');
app.use(cors())
app.use(express.json());
const mysql2=require("mysql2");
const q=mysql2.createConnection({
host:"localhost",
database:"cruddb",
user:"root",
password:""

})
//1-GetAllUsers
app.get('/getAllProducts',(req,res)=>{
q.execute(`select * from products`,(err,results)=>{
    res.json({message:"success" ,results})
})
})
//2-addUsers
app.post('/addProducts',(req,res)=>{
  const {name,price,description}=req.body;
    q.execute(`insert into products (name,price,description) 
    values ('${name}',${price},'${description}')`)
    res.json({message:"success"})

})

//3-UpdateUserByID

app.put('/updateProducts',(req,res)=>{
    const {name,id,price,description}=req.body;
      q.execute(`update products set name='${name}' , price=${price} , description="${description}" where id='${id}'`)
      res.json({message:"success"})
  
  })

//4-DeleteUserByID
app.delete('/deleteProducts',(req,res)=>{
    const {id}=req.body;
      q.execute(`delete from products  where id='${id}'`)
      res.json({message:"success"})
  
  })

//    //6-Search by name use like

   app.get('/SearchUsers/:name',(req,res)=>{
// const {name}=req.body
    q.execute(`select * from users where name like '${req.params.name}'`,(err,results)=>{
        res.json({message:results})
    })
    })

   

app.listen(3000,()=>{
    console.log("procces is running...")
})