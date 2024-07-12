import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(){
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")

    const navigate = useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:9000/users/login', {email,password})
        .then(res=>{
            navigate('/users')
        })
        .catch(err=>alert("Invalid email or password"))
    }

    const handleCreateUser = () => {
        navigate('/newuser');
    };



    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-100 w-md-50 bg-white rounded p-3">
                <form onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <div className="mb-2 row">
                        <div className="col">
                            <label htmlFor="">Email</label>
                            <input 
                                type="email"
                                placeholder="Enter Email"
                                className="form-control"
                                onChange={(e)=> setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Password</label>
                        <input 
                            type="password"
                            placeholder="Enter password"
                            className="form-control"
                            onChange={(e)=> setPassword(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-success">Login</button>
                </form>
                <button className="btn btn-primary mt-3" onClick={handleCreateUser}>Create User</button>
            </div>
        </div>
    );
}

export default Login;