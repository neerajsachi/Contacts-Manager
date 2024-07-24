import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewUser() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [dobError, setDobError] = useState("");
    const [formError, setFormError] = useState("");

    const apiUrl = import.meta.env.VITE_API_URL_REGISTER

    const navigate = useNavigate();

    const validateEmail = (email) => {
        const regex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    };

    const validatePhone = (phone) => {
        const regex = /^[0-9]+$/;
        return regex.test(phone);
    };

    const validateDob = (dob) => {
        const date = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - date.getFullYear();
        const month = today.getMonth() - date.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < date.getDate())) {
            age--;
        }
        return !isNaN(date.getTime()) && date < today && age >= 18; 
    };

    const handleFileChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let valid = true;

        if (!email || !password || !firstName || !lastName || !dateOfBirth || !gender || !phone || !address || !profilePicture) {
            setFormError("Please fill the above fields");
            valid = false;
        } else {
            setFormError("");
        }

        if (email && !validateEmail(email)) {
            setEmailError("Invalid email format");
            valid = false;
        } else {
            setEmailError("");
        }

        if (password && password.length < 6) {
            setPasswordError("Password must be at least 6 characters");
            valid = false;
        } else {
            setPasswordError("");
        }

        if (dateOfBirth && !validateDob(dateOfBirth)) {
            setDobError("Invalid date of birth. You must be at least 18 years old.");
            valid = false;
        } else {
            setDobError("");
        }

        if (phone && !validatePhone(phone)) {
            setPhoneError("Phone number must contain only numbers");
            valid = false;
        } else {
            setPhoneError("");
        }

        if (!valid) {
            return;
        }

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('dateOfBirth', dateOfBirth);
        formData.append('gender', gender);
        formData.append('phone', phone);
        formData.append('address', address);
        formData.append('profilePicture', profilePicture);

        try {
            const response = await axios.post(apiUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 201) {
                alert('User created successfully');
                navigate('/');
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
                            <label>Email</label>
                            <input 
                                type="email"
                                placeholder="Enter Email"
                                className="form-control"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            {emailError && <div className="text-danger">{emailError}</div>}
                        </div>
                    </div>
                    <div className="mb-2">
                        <label>Password</label>
                        <input 
                            type="password"
                            placeholder="Enter password"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {passwordError && <div className="text-danger">{passwordError}</div>}
                    </div>
                    <div className="mb-2 row">
                        <div className="col">
                            <label>First Name</label>
                            <input 
                                type="text"
                                placeholder="Enter First Name"
                                className="form-control"
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col">
                            <label>Last Name</label>
                            <input 
                                type="text"
                                placeholder="Enter Last Name"
                                className="form-control"
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-2">
                        <label>Date of Birth</label>
                        <input 
                            type="date"
                            className="form-control"
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            min="1950-01-01"
                            max={new Date().toISOString().split("T")[0]}
                            required
                        />
                        {dobError && <div className="text-danger">{dobError}</div>}
                    </div>
                    <div className="mb-2">
                        <label>Gender</label>
                        <select className="form-control" onChange={(e) => setGender(e.target.value)} required>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <label>Phone</label>
                        <input 
                            type="text"
                            placeholder="Enter Phone"
                            className="form-control"
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                        {phoneError && <div className="text-danger">{phoneError}</div>}
                    </div>
                    <div className="mb-2">
                        <label>Address</label>
                        <input 
                            type="text"
                            placeholder="Enter Address"
                            className="form-control"
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label>Profile Picture</label>
                        <input 
                            type="file"
                            className="form-control"
                            onChange={handleFileChange}
                            accept="image/png, image/jpeg"
                            required
                        />
                    </div>
                    <button className="btn btn-success" type="submit">Create</button>
                    {formError && <div className="text-danger mt-2">{formError}</div>}
                </form>
                <button className="btn btn-primary mt-3" onClick={back}>Back</button>
            </div>
        </div>
    );
}

export default NewUser;
