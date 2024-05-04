const  nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async(email,title,body)=>{

    try{

        console.log(email);

        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS,
            }
        });
        
       
    
       let info =  transporter.sendMail({
            from: `abhishek`,
            to: 'abhishekkushwaha058@gmail.com',
            subject: title,
            html: body,
            
        },(err,result)=>{
            if(err){
                console.log("error!",err.message);
            }else{
                console.log(result);
            }
           

        })

        console.log("info",info);

    } catch(error){
        console.log("error in mail utiliy function")
        console.log(error.message);
    }

};
module.exports=mailSender;

