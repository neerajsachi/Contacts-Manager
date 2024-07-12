import { useState } from "react";
import axios from "axios";
import { addUser } from "./redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreateUser(){

    const [name,setName]= useState()
    const [email,setEmail]= useState()
    const [phone,setPhone]= useState()

    const dispatch= useDispatch();
    const navigate = useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:9000/users', {name,email,phone})
        .then(res=>{
            dispatch(addUser(res.data))
            navigate('/users')
        })
        .catch(err=>console.log(err))
    }


    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-100 w-md-50 bg-white rounded p-3">
                <form onSubmit={handleSubmit}>
                    <h2>Add User</h2>
                    <div className="mb-2 row">
                        <div className="col">
                            <label htmlFor="">Name</label>
                            <input 
                                type="text"
                                placeholder="Enter name"
                                className="form-control"
                                onChange={(e)=> setName(e.target.value)}
                            />
                        </div>
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
                        <label htmlFor="">Phone</label>
                        <input 
                            type="text"
                            placeholder="Enter phone"
                            className="form-control"
                            onChange={(e)=> setPhone(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateUser;