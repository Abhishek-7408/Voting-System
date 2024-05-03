import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {ToastContainer, toast } from "react-toastify";
import axios from "axios";


const Login = () =>{
    const Navigate=useNavigate();
        const[loginData, setLogin]= useState({
            email:"",
            password:""
        });

        const changeHandler =(e)=>{
            const{name,value}=e.target;
            setLogin({
                ...loginData,
                [name]:value
            })
            console.log(loginData);
        }
        const submitHandler=async(e)=>{
            e.preventDefault();
            const {email,password}=loginData;

            if(email===""){
                toast.error("fill  email")
            }
            else if(!email.includes("@")){
                toast.error("fill valid email address")
            }
            else if(password===""){
                toast.error("your password is empty")
            }
            else{
                const response = await axios.post("http://localhost:4000/api/v1/user/login",loginData);
                console.log(response);
                if(response.data.success){
                    localStorage.setItem("token",response.data.token);
                   
                   Navigate("/dashboard")
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
                    <label htmlFor="email">email</label>
                    <input type="text" name="email" placeholder="email" onChange={changeHandler}/>
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input type="password" name="password" placeholder="password" onChange={changeHandler}/>
                </div>

                <button className="btn" onClick={submitHandler}>Login</button>
                <p>Don't have an account <NavLink to="/register">register</NavLink></p>
            </form>
            <ToastContainer/>
        </div>
    )
}
export default Login;