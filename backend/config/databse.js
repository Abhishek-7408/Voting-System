const mongoose = require("mongoose");
require("dotenv").config();
exports.dbconnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>console.log(`db connected successfuly`))
    .catch((error)=>{
        console.log(`coonection issue`)
    })
}