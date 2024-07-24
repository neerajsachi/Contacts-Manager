import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setLoggedInUser, setToken } from "./redux/userSlice";
import { useDispatch } from "react-redux";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const apiUrl = import.meta.env.VITE_API_URL_LOGIN;

    const validateEmail = (email) => {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let valid = true;

        if (!validateEmail(email)) {
            setEmailError("Invalid email format");
            valid = false;
        } else {
            setEmailError("");
        }

        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters");
            valid = false;
        } else {
            setPasswordError("");
        }

        axios.post(apiUrl, { email, password })
            .then(res => {
                const { accessToken, user } = res.data;
                localStorage.setItem('token', accessToken);
                dispatch(setToken(accessToken));
                dispatch(setLoggedInUser(user));
                navigate('/users');
            })
            .catch(err => {
                console.log(err);
                alert("Invalid email or password");
            });
    };

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
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            {emailError && <div className="text-danger">{emailError}</div>}
                        </div>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {passwordError && <div className="text-danger">{passwordError}</div>}
                    </div>
                    <button className="btn btn-success">Login</button>
                </form>
                <button className="btn btn-primary mt-3" onClick={handleCreateUser}>Create User</button>
            </div>
        </div>
    );
}

export default Login;
