import React from "react";
import { useEffect, useState } from "react";
import {message} from "antd"
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";


const Dashboard =()=>{
    const Navigate = useNavigate();
    const [candidates, setcandidate]= useState();
    let userId = null;
    const getallcandidate=async()=>{

        const res= await axios.get("http://localhost:4000/api/v1/getAllCandidates",{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        }) 
        
        console.log(res);
        if(res.data.success){
             setcandidate(res.data.candidates)
        }
        else{
            console.log(res);
        }

    }

    const submitHandler=(e)=>{
        e.preventDefault();

        localStorage.clear();
        Navigate("/login");

    }

    useEffect(()=>{
        getallcandidate();
    },[])
    const voting=async(val)=>{
        let userId
       const res = await axios.post("http://localhost:4000/api/v1/voted",{
        userId,
        val
       },{
        headers:{
            Authorization: "Bearer "+localStorage.getItem("token")
        }
       })
       if(res.data.success){
            message.success("voted successfully");
            Navigate("/login");
       }
       else{
            message.error(res.data.message);
       }
    }
    return(
        <div>
            <div>
               { candidates && candidates.map((candidate)=>(
                <div key={candidate._id}>
                    <div>Name: {candidate.name}</div>
                    <div> party: {candidate.party}</div>
                    <div>No of vote : {candidate.vote}</div>
                    <div>
                        <button onClick={()=>voting(candidate._id)}>vote</button>  
                    </div>
                    <div></div>
                </div>
               ))}
            </div>
            <div>

            </div>
            <br></br>
            <button onClick={submitHandler}>LOGOUT</button>

        </div>
    )
}
export default Dashboard;