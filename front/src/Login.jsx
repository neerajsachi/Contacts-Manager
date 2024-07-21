import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setLoggedInUser, setToken } from "./redux/userSlice";
import { useDispatch } from "react-redux";

function Login(){
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:9000/users/login', {email,password})
        .then(res=>{
            const { accessToken, user } = res.data;
            localStorage.setItem('token', accessToken);
            dispatch(setToken(accessToken));
            dispatch(setLoggedInUser(user));
            navigate('/users')
        })
        .catch(err=>
            console.log(err),
            alert("Invalid email or password"))
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
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Password</label>
                        <input 
                            type="password"
                            placeholder="Enter password"
                            className="form-control"
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            required
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