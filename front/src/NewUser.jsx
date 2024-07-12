import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewUser(){
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:9000/users/register', { email, password });
            if (response.status === 201) {
                alert('User created successfully');
            }
        } catch (err) {
            if (err.response) {
                if (err.response.status === 400) {
                    alert('Email already exists');
                } else {
                    alert(`Error: ${err.response.data.message}`);
                }
            }
        }
    };
    
    

    const back = () => {
        navigate('/');
    };



    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-100 w-md-50 bg-white rounded p-3">
                <form onSubmit={handleSubmit}>
                    <h2>New User</h2>
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
                    <button className="btn btn-success">Create</button>
                </form>
                <button className="btn btn-primary mt-3" onClick={back}>Back</button>
            </div>
        </div>
    );
}

export default NewUser;