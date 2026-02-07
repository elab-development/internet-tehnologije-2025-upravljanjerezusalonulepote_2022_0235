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

    const handleSubmit = async (e) => {
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

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            body: JSON.stringify({
                email: username, 
                password: password
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                localStorage.setItem("auth", "true");
                localStorage.setItem("token", data.data.token); 
                localStorage.setItem("userName", data.data.user.name);
                navigate("/"); 
            } else {
                setPasswordError(data.error || "Pogrešan email ili lozinka.");
            }
        } catch (error) {
            console.error("Greška pri povezivanju:", error);
            setPasswordError("Server nije dostupan. Proveri da li je backend pokrenut.");
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
