import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import Slatkica from "../../assets/slatkica.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setUsernameError("");
        setPasswordError("");

        let valid = true;

        if (!username) {
            setUsernameError("Username je obavezno.");
            valid = false;
        }

        if (!password) {
            setPasswordError("Password je obavezno.");
            valid = false;
        }

        if (!valid) return;

        if (username === "admin" && password === "123") {
            localStorage.setItem("auth", "true");
            navigate("/main");
        } else {
            setPasswordError("Pogrešan username ili password.");
        }
    };

    return (
        <div className="login-page">
            <div className='page-container'>
                <form className="login-form" onSubmit={handleSubmit}>
                    <img className="logo" src={Slatkica} alt="logo" />

                    <div className="input-group username">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setUsernameError("");
                            }}
                        />
                        {usernameError && <div className="error-message">{usernameError}</div>}
                    </div>

                    <div className="input-group password">
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordError("");
                                }}
                            />
                            <span className="password-toggle" onClick={togglePasswordVisibility}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {passwordError && <div className="error-message">{passwordError}</div>}
                    </div>

                    <button className="btn-login" type="submit">
                        Log in
                    </button>

                    <div className="links-row">
                        <Link to="/forgot" className="link">Forgot password?</Link>
                        <span className="divider">|</span>
                        <Link to="/register" className="link">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;