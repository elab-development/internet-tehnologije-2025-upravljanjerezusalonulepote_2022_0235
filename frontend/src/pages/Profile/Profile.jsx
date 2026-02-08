import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import Slatkica from "../../assets/slatkica.png";

function Profile() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    if (!user) {
        return (
            <div className="profile-page">
                <div className="profile-card">
                    <h2>Niste ulogovani</h2>
                    <button className="logout-button" onClick={() => navigate("/login")}>Idi na Login</button>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="profile-card">
                <img src={Slatkica} alt="Avatar" className="profile-avatar" />
                <h2>{user.name}</h2>
                <div className="badge">{user.role}</div>

                <div className="profile-info">
                    <div className="info-item">
                        <small>Email adresa</small>
                        <p>{user.email}</p>
                    </div>
                    <div className="info-item">
                        <small>Broj telefona</small>
                        <p>{user.phone || "Nije unet"}</p>
                    </div>
                </div>

                <button className="logout-button" onClick={handleLogout}>Odjavi se</button>
            </div>
        </div>
    );
}

export default Profile;