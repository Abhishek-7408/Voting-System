import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {ToastContainer, toast } from "react-toastify";
import { registrationcall,SenOtpCall } from "../services/ApiCall";


const Register =()=>{

    const[showpass,setpass]=useState(false);
    const[inputdata, setinputData] = useState({
        name:"",
        lname:"",
        email:"",
        password:"",
        cpassword:"",
        otp:""
    });

    const [showEmail,setEmail]=useState({
        email:""
    });
    
    
      
    const changeHandler = (e)=>{

        const {name,value}=e.target;
        setinputData({
            ...inputdata,
            [name] : value
        })
        console.log(inputdata)
    }

    const navigate = useNavigate();

    const changeHnadler1 = (e)=>{
        const{name,value} =e.target;
        setEmail({
            
            [name]: value}
        )
        console.log(showEmail)  
    }


    const handleChange=(e)=>{
        changeHnadler1(e)
        changeHandler(e)
    }
    const otpHandler =async(e)=>{
        e.preventDefault();

            const {email}=showEmail;
            if(!email){
                toast.error("email is empty")
            }
            else{
                const response= await SenOtpCall(showEmail)

                if(response.status===200){
                    // navigate("/otp");
                }
                else{
                    toast.error(response.error);
                }

            }
    }

    const submitHandler = async(e)=>{
        e.preventDefault();
        const{name,lname,email,password,cpassword,otp}=inputdata;

        if(name===''){
            toast.error("enter your name")
        }
        else if(lname===""){
            toast.error("enter your last name")
        }
        else if(email===""){
            toast.error("enter email")
        }
        else if(!email.includes("@")){
            toast.error("enter a valid email address")
        }
        else if(password===""){
            toast.error("enter a valid password")
        }
        else if(password.length<6){
            toast.error("password atleat contain 6 letter")
        }
        else if(password!==cpassword){
            toast.error("password doesnt match with confirm password")
        }
        else if(otp===""){
            toast.error("enter otp first");
        }
        else{
            const response = await registrationcall(inputdata);
            if(response.status===200){
                navigate("/login");
            }

            else{
                toast.error(response.error);
            }

        }


    }

    return(
        <div>
            <form>
                <div>
                <label htmlFor="name">first name</label>
                <input type="text" name="name" onChange={handleChange} placeholder="your first name"/>
                </div>

                <div>
                    <label htmlFor="lname">Last Name</label>
                    <input type="text" name="lname" placeholder="your last name" onChange={changeHandler}/>
                </div>

                <div>
                    <label htmlFor="email">email</label>
                    <input type="text" name="email" placeholder="xyz@gmail.com" onChange={handleChange } />
                </div>



                <div>
                    <label htmlFor="password">password</label>
                    <div id="two">
                        <input type={!showpass?"password":"text"}  name="password" onChange={changeHandler} placeholder="Enter your password"/>
                        <div onClick={()=>setpass(!showpass)}>{!showpass?"show":"hide"}</div>

                    </div>

                    <label htmlFor="cpassword">password</label>
                    <div id="ctwo">
                        <input type={!showpass?"password":"text"}  name="cpassword" onChange={changeHandler} placeholder="Enter your password"/>
                        <div onClick={()=>setpass(!showpass)}>{!showpass?"show":"hide"}</div>

                    </div>
                    <div>
                        <label htmlFor="otp">OTP:</label>
                        <input type="text" name="otp" placeholder="enter otp" onChange={changeHandler} />
                    </div>

                </div>


                <button type="submit" className="btn" onClick={otpHandler}>Send Otp</button>

                <button type="submit" className="btn" onClick={submitHandler}>Sign Up</button>
                <p>Already have an account<NavLink to="/login">Login</NavLink></p>
    
            </form>
            <ToastContainer/>
        </div>
    )

};
export  default  Register;
 