const mongoose = require("mongoose");

const candidateSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    party:{
        type:String,
        require:true
    },
    vote:{
        type:Number,
        default:1
    },

});
module.exports= mongoose.model("candidate", candidateSchema);