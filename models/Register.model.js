const mongoose=require('mongoose')
const {hash}=require('bcrypt')
// required('mongoose-type-email')

const RegisterSchema=new mongoose.Schema({
    user:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    Phonenumber:{
        type:Number,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    }
})
RegisterSchema.pre('save',async function(next){
    const cryptedPassword= await hash(this.Password,10)
    this.Password=cryptedPassword
})

const RegisterModel=mongoose.model("Register",RegisterSchema)
module.exports=RegisterModel

