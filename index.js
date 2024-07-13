const express=require('express')
const app=express()
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const RegisterModel=require('models/Register.model')
const port=8001

app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}))

main()
    .then(()=>{
        console.log("DataBase connect Successfully")
    })
    .catch((err=>{
            console.log("Error: ",err)
    }
    ))

function main(){
    mongoose.connect("mongodb://localhost:27017/test")
}
app.post('/user',(req,res)=>{
    try {
        const newuser = req.body
        const user = RegisterModel.create(newuser)
        return res.status(201).json({message: "Data Received Successfully"})
    }
    catch (e) {
        console.log("error: ",e)
    }
})
app.get('/user',async(req,res)=>{
    try{
     const user=await RegisterModel.find({age:{$ne:21}}).select({age:1})
     return res.status(201).json(user)
    }
    catch (e) {
        console.log("Error: ",e)
    }
})

app.put('/user/:id',async(req,res)=>{
    try {
        const {id} = req.body;
        const user=await RegisterModel.findByIdAndUpdate(id,req.body,{new:True})
        res.status(201).json({message:"Update Successfully"})
    }
    catch (e) {
        console.log("Error: ",e)
    }
})

app.delete('/user/:id',async (req,res)=>{
    try {
        const {id} = req.body;
        const user = await RegisterModel.findByIdAndDelete(id)
        res.status(201).json({message: "Delete Successfully"})
    }
    catch (e) {
        console.log("Error: ",e)

    }
})
app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}/`)
})