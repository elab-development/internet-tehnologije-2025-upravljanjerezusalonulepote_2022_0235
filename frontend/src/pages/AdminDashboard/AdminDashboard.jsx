import React, { useEffect, useState } from 'react';
import './AdminDashboard.css'; 
import axios from 'axios';

export default function AdminDashboard() {
  const role = localStorage.getItem("userRole");

  if (role !== "ADMIN") {
    return <div className="error-msg">Nemate ovlašćenje da pristupite ovoj stranici.</div>;
  }

  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/appointments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(res.data.data || res.data);
    } catch (err) {
      console.error("Greška pri dohvatanju:", err.response?.data || err.message);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:3000/api/appointments/${id}/status`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Status promenjen u: ${newStatus}`);
      fetchAppointments(); 
    } catch (err) {
      alert("Greška pri ažuriranju statusa.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Da li ste sigurni da želite trajno da obrišete ovu rezervaciju?")) {
      try {
        await axios.delete(`http://localhost:3000/api/appointments/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Rezervacija obrisana!");
        fetchAppointments();
      } catch (err) {
        alert("Greška pri brisanju.");
      }
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Upravljanje svim rezervacijama</h2>
      
      <div className="admin-grid">
        {appointments.length > 0 ? (
          appointments.map(a => (
            <div key={a.id} className={`admin-card status-${a.status?.toLowerCase()}`}>
              <div className="appointment-header">
                <span className={`status-badge status-${a.status?.toLowerCase()}`}>
                  {a.status === "CANCELED" ? "CANCELED" : a.status}
                </span>
                <button className="delete-icon-btn" onClick={() => handleDelete(a.id)}>🗑️</button>
              </div>

              <div className="appointment-time-info">
                <span className="badge-date">📅 {a.schedule?.date}</span>
                <span className="badge-time">⏰ {a.schedule?.startTime?.substring(0, 5)}h</span>
              </div>
              
              <div className="appointment-details">
                  <p><strong>👤 Klijent:</strong> {a.client?.name}</p>
                  <p><strong>💄 Usluga:</strong> {a.service?.name}</p>
                  <p><strong>💰 Cena:</strong> {a.service?.price} RSD</p>
              </div>
            
              <div className="admin-btns">
                {a.status !== "CANCELED" && (
                <>
                  {a.status !== "CONFIRMED" && (
                    <button className="approve-btn" onClick={() => handleStatusChange(a.id, "CONFIRMED")}>
                      Potvrdi
                    </button>
                  )}
                  <button className="reject-btn" onClick={() => handleStatusChange(a.id, "CANCELED")}>
                    Odbij
                  </button>
                </>
              )}
              </div>
            </div>
          ))
        ) : (
          <p className="no-appointments">Baza podataka je prazna.</p>
        )}
      </div>
    </div>
  );
}