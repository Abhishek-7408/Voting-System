const bcrypt = require("bcrypt");
const OTP = require("../model/otpModel");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

exports.signup = async(req, res) =>{

    try{
        const {name, email, password , otp} =req.body;
        if(!name || !email || !password || !otp){
            return res.status(403).json({
                success:false,
                message:`fill all detail`
            });
        }

        const userexist = await User.findOne({email});

        if(userexist){
            return res.status(401).json({
                success:false,
                message:`user Already exist`
            });
        }

        const response = await OTP.find({email}).sort({createdAt:-1}).limit(1);

        if(response.length===0  || response[0].otp !== otp){
            return res.status(400).json({
                success:false,
                message:`invalid OTP `
            })
        }

        let hasspassword;
        try{
            hasspassword = await bcrypt.hash(password, 10);
        }
        catch(error){
            return res.status(500).json({
                success:false,
                message:`error in hashing password`

            })
        }
        console.log(hasspassword);

        const Newuser = await User.create({
            name,
            email,
            Password:hasspassword
            
        });console.log(Newuser);

        return res.status(200).json({
            success:true,
            message:`entry created succesfully`,
            user:Newuser
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: error.message,message:"last me error aagye " });
      }

}


exports.login = async(req,res)=>{

    try{
        

        const{email, password}=req.body;

        if(!email || !password ){
            return res.status(403).json({
                success:false,
                message:"fill all detaill"
            })
        }
      

        const  userexist = await User.findOne({email:email});

        if(!userexist){
            return res.stauts(403).json({
                success:false,
                message:"user not exist"
            })
        }

        
        
        if(await bcrypt.compare(password, userexist.Password)){
            
            const token= jwt.sign({id:userexist._id},process.env.JWT_SECRET, {
                expiresIn: '2h',
            })
                 res.status(200).json({
                    success:true,
                    message:"loged in succcessfully",
                    token
                })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"password in correct"
            })
        }


    } catch(error){

    }
    
}