import { useState } from "react";
import axios from "axios";
import { updateUser } from "./redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";



function UpdateUser(){

    const {id}= useParams()
    console.log("useParams id:", id);
    const users = useSelector(state=>state.users.users)
    const user=users.find(u=>u.id===id)
    console.log("Found user:", user);
    const token = useSelector(state => state.users.token);
    console.log(user)
    const dispatch= useDispatch();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL_USERS;

    useEffect(() => {
        if (!token) {
            alert("Unauthorized");
            navigate('/');
        }
    }, [token, navigate]);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [company, setCompany] = useState("");

    

    useEffect(() => {
        if (user) {
            setFirstName(user.fname);
            setLastName(user.lname);
            setPhone(user.phone);
            setAddress(user.address);
            setCompany(user.company);
        }
    }, [user]);

    const handleUpdate=(e)=>{
        e.preventDefault()
        axios.put(`${apiUrl}/${id}`, {
            fname: firstName,
            lname: lastName,
            address: address,
            company: company,
            phone: phone
        },{
            headers: {
                Authorization: `Bearer ${token}`
            }})
        .then(res=>{
            dispatch(updateUser({
                id: id,
                fname: firstName,
                lname: lastName,
                address: address,
                company: company,
                phone: phone
            }));
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
                <form onSubmit={handleUpdate}>
                    <h2>Update User</h2>
                    <div className="mb-2 row">
                        <div className="col">
                            <label>First Name</label>
                            <input 
                                type="text"
                                placeholder="Enter First Name"
                                className="form-control"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="col">
                            <label>Last Name</label>
                            <input 
                                type="text"
                                placeholder="Enter Last Name"
                                className="form-control"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-2">
                        <label>Address</label>
                        <input 
                            type="text"
                            placeholder="Enter Address"
                            className="form-control"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label>Company</label>
                        <input 
                            type="text"
                            placeholder="Enter Company"
                            className="form-control"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label>Phone</label>
                        <input 
                            type="number"
                            placeholder="Enter Phone"
                            className="form-control"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-success">Update</button>
                </form>
                <button className="btn btn-primary mt-3" onClick={back}>Back</button>
            </div>
        </div>
    );
}

export default UpdateUser