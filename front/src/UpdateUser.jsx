import { useState } from "react";
import axios from "axios";
import { updateUser } from "./redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";



function UpdateUser(){

    const {id}= useParams()
    console.log(id)
    const users = useSelector(state=>state.users.users)
    const user=users.find(u=>u.id===id)
    console.log(user)

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);

    const dispatch= useDispatch();
    const navigate = useNavigate();

    const handleUpdate=(e)=>{
        e.preventDefault()
        axios.put(`http://localhost:9000/users/${id}`, {name,email,phone})
        .then(res=>{
            dispatch(updateUser({id,name,email,phone}))
            navigate('/')
        })
        .catch(err=>console.log(err))
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-100 w-md-50 bg-white rounded p-3">
                <form onSubmit={handleUpdate}>
                    <h2>Update User</h2>
                    <div className="mb-2 row">
                        <div className="col">
                            <label htmlFor="">Name</label>
                            <input 
                                type="text"
                                placeholder="Enter name"
                                className="form-control"
                                value={name}
                                onChange={(e)=> setName(e.target.value)}
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="">Email</label>
                            <input 
                                type="email"
                                placeholder="Enter Email"
                                className="form-control"
                                value={email}
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
                            value={phone}
                            onChange={(e)=> setPhone(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-success">Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser