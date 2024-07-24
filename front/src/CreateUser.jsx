import { useState, useEffect } from "react";
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

    const [fnameError, setFnameError] = useState("");
    const [lnameError, setLnameError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [companyError, setCompanyError] = useState("");
    const [formError, setFormError] = useState("");

    const dispatch= useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.users.token);

    const apiUrl = import.meta.env.VITE_API_URL_USERS;


    useEffect(() => {
        if (!token) {
            alert("Unauthorized");
            navigate('/');
        }
    }, [token, navigate]);

    const validatePhone = (phone) => {
        const regex = /^[0-9]+$/;
        return regex.test(phone);
    };

    const handleSubmit=(e)=>{
        e.preventDefault()

        let valid = true;

        if (!fname || !lname || !phone || !address || !company) {
            setFormError("Please fill the above fields");
            valid = false;
        } else {
            setFormError("");
        }

        if (!fname) {
            setFnameError("First name is required");
            valid = false;
        } else {
            setFnameError("");
        }

        if (!lname) {
            setLnameError("Last name is required");
            valid = false;
        } else {
            setLnameError("");
        }

        if (!phone || !validatePhone(phone)) {
            setPhoneError("Valid phone number is required");
            valid = false;
        } else {
            setPhoneError("");
        }

        if (!address) {
            setAddressError("Address is required");
            valid = false;
        } else {
            setAddressError("");
        }

        if (!company) {
            setCompanyError("Company is required");
            valid = false;
        } else {
            setCompanyError("");
        }

        if (!valid) {
            return;
        }

        axios.post(apiUrl, {
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
                            {fnameError && <div className="text-danger">{fnameError}</div>}
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
                    {lnameError && <div className="text-danger">{lnameError}</div>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Phone</label>
                        <input 
                            type="number"
                            placeholder="Enter Phone"
                            className="form-control"
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    {phoneError && <div className="text-danger">{phoneError}</div>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Address</label>
                        <input 
                            type="text"
                            placeholder="Enter Address"
                            className="form-control"
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        {addressError && <div className="text-danger">{addressError}</div>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Company</label>
                        <input 
                            type="text"
                            placeholder="Enter company"
                            className="form-control"
                            onChange={(e) => setCompany(e.target.value)}
                        />
                        {companyError && <div className="text-danger">{companyError}</div>}
                    </div>
                    <button className="btn btn-success">Create</button>
                </form>
                <button className="btn btn-primary mt-3" onClick={back}>Back</button>
            </div>
        </div>
    );
}



export default CreateUser;