import { useState } from "react";
import axios from "axios";
import { addUser } from "./redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreateUser(){


    const [fname, setFirstName] = useState("");
    const [lname, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [company, setCompany] = useState("");

    const dispatch= useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.users.token);

    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:9000/users', {
            fname,
            lname,
            address,
            company,
            phone},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res=>{
            dispatch(addUser(res.data))
            navigate('/users')
        })
        .catch(err=>console.log(err))
    }

    const back=()=>{
        navigate('/users')
        
    }


    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-100 w-md-50 bg-white rounded p-3">
                <form onSubmit={handleSubmit}>
                    <h2>New User</h2>
                    <div className="mb-2 row">
                        <div className="col">
                            <label htmlFor="">First Name</label>
                            <input 
                                type="text"
                                placeholder="Enter First Name"
                                className="form-control"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">Last Name</label>
                            <input 
                                type="text"
                                placeholder="Enter Last Name"
                                className="form-control"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Phone</label>
                        <input 
                            type="number"
                            placeholder="Enter Phone"
                            className="form-control"
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Address</label>
                        <input 
                            type="text"
                            placeholder="Enter Address"
                            className="form-control"
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Company</label>
                        <input 
                            type="text"
                            placeholder="Enter company"
                            className="form-control"
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-success">Create</button>
                </form>
                <button className="btn btn-primary mt-3" onClick={back}>Back</button>
            </div>
        </div>
    );
}



export default CreateUser;