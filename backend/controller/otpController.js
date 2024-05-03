const otpGenerator = require("otp-generator");
const OTP = require("../model/otpModel");
const User = require("../model/user");


exports.sendOtp = async(req,res)=>{
    try{
        const {email}= req.body;

        let existingUser =await  User.findOne({email});

        if(existingUser){
           return res.status(401).json({
                success:false,
                message:'user Already exists'
            })
        }

        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });

        let result= await  OTP.findOne({otp:otp});

        while(result){
            let otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                
            });
            result= await  OTP.findOne({otp:otp});
            console.log('this is result',result )
        }
        const carrier  = {email,otp};
        const answer = OTP.create(carrier);
        res.status(200).json({
            success:true,
            message:`message sent successfully`,
            carrier
        });

    } catch(error){
         return  res.status(400).json({
            success:false,
            message:`error in otp section`,
            error:(error.message)
         })
    }
};