const mongoose= require("mongoose");
const mailSender = require("../utils/mailSender");

const optSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        trim :true
    },
    otp:{
        type:String,
        require:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:60*5
    }
});
async function sendVerification(email,otp){
    try{
        const mailresponse = await mailSender(
        
            {email},
            "verification email",
            `<h1>this is your verfication code</h1>
            <p> you otp is ${otp} </p>`
       
        );
        console.log("mail response ", mailresponse);

    } catch(error){
        console.log("error in sending email")
        throw error;
    }

    
    
}
optSchema.pre("save", async function(next){
    if(this.isNew)
         sendVerification(this.email,this.otp);
    
    next();
    
})

module.exports = mongoose.model("OTP",optSchema);