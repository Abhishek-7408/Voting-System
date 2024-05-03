const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true
    },
    Password:{
        type:String,
        require:true
    },
    voted:{
        type:Boolean,
        default:false
    }
})

module.exports=mongoose.model("User",userSchema);