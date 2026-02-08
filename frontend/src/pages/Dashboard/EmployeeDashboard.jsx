import React, { useEffect, useState } from 'react';
import './EmployeeDashboard.css';
import axios from 'axios';
export default function EmployeeDashboard() {
  const role = localStorage.getItem("userRole");

  if (role !== "MAKEUP_ARTIST") {
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
    
    console.log("Response sa servera:", res.data);

    const dataZaPrikaz = res.data.data || res.data;

    if (Array.isArray(dataZaPrikaz)) {
      const filtrirani = dataZaPrikaz.filter(a => 
        a.status && a.status.toUpperCase() === "PENDING"
      );
      setAppointments(filtrirani);
    } else {
      console.warn("Podaci nisu stigli kao niz!", dataZaPrikaz);
    }

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
      alert("Status ažuriran!");
      fetchAppointments(); 
    } catch (err) {
      alert("Greška pri ažuriranju.");
    }
  };

  return (
    <div className="employee-container">
      <h2 className="employee-title">Nove rezervacije</h2>
      <div className="employee-grid">
        {appointments.length > 0 ? (
          appointments.map(a => (
            <div key={a.id} className="employee-card">
              <div className="appointment-time-info">
                <span className="badge-date">📅 {a.schedule?.date}</span>
                <span className="badge-time">⏰ {a.schedule?.startTime?.substring(0, 5)}h</span>
              </div>
              
              <div className="appointment-details">
                  <p>
                    <strong>👤 Klijent</strong> 
                    <span className="client-name">{a.client?.name}</span>
                  </p>
                  <p>
                    <strong>💄 Usluga</strong> 
                    <span className="service-name">{a.service?.name}</span>
                   </p>
              </div>

              <div className="employee-btns">
                <button className="approve-btn" onClick={() => handleStatusChange(a.id, "CONFIRMED")}>
                  Potvrdi
                </button>
                <button className="reject-btn" onClick={() => handleStatusChange(a.id, "REJECTED")}>
                  Odbij
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-appointments">Trenutno nema novih zahteva na čekanju.</p>
        )}
      </div>
    </div>
  );
}