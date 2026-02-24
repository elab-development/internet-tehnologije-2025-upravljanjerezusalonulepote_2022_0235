import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Booking.css';
import CurrencyConverter from '../../components/CurrencyConverter';

export default function Booking({ triggerTransition }) {
  const [services, setServices] = useState([]);      
  const [availableSchedules, setAvailableSchedules] = useState([]); 
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedScheduleId, setSelectedScheduleId] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

 useEffect(() => {
  axios.get(`${API_BASE_URL}/api/services`)
    .then(res => {
      console.log("Stiglo sa servera:", res.data);
      
      if (res.data && Array.isArray(res.data.data)) {
        setServices(res.data.data); 
      } else {
        setServices([]); 
      }
      
      setLoading(false);
    })
    .catch(err => {
      console.error("Greška kod usluga:", err);
      setServices([]); 
      setLoading(false);
    });
}, []);

useEffect(() => {
  if (selectedDate) {
    console.log("React šalje datum:", selectedDate); 
    axios.get(`${API_BASE_URL}/api/appointments/schedules?date=${selectedDate}`)
      .then(res => {
        console.log("Stigli termini sa backenda:", res.data.data);
        setAvailableSchedules(res.data.data || []);
      })
      .catch(err => console.error("Greška:", err));
  }
}, [selectedDate]);

  const today = new Date().toISOString().split('T')[0];

    const handleBooking = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Morate biti ulogovani!");
        navigate("/login");
        return;
    }

    const data = {
        serviceId: selectedService?.id, 
        scheduleId: selectedScheduleId, 
    };

    try {
        const response = await axios.post(`${API_BASE_URL}/api/appointments`, data, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.success) {
            setShowSuccessModal(true); 
        }
    } catch (err) {
        console.error(err);
        alert("Greška: " + (err.response?.data?.error || "Došlo je do greške"));
    }
};

  if (loading) return <div className="loader">Učitavanje...</div>;

  return (
    <div className="booking-page-wrapper">
    <div className="booking-container">
      <h2 className="booking-title">Zakažite termin</h2>

      <div className={!isLoggedIn ? "form-disabled" : ""}>
        <label className="section-label">1. Izaberite uslugu</label>
        <div className="services-grid">
          {services.map((s) => (
            <button
              key={s.id}
              className={`service-card ${selectedService?.id === s.id ? 'active' : ''}`}
              onClick={() => setSelectedService(s)}
            >
              <strong>{s.name}</strong>
              <p>
                {s.price} RSD 
                <CurrencyConverter rsdPrice={s.price} />
              </p>
            </button>
          ))}
        </div>

        <label className="section-label">2. Izaberite datum</label>
        <input
          type="date"
          min={today}
          className="date-picker"
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setSelectedScheduleId(null);
          }}
        />

        {selectedDate && (
                <div className="time-selection">
                <label className="section-label">3. Dostupni termini za {selectedDate}</label>
                <div className="time-grid">
                {availableSchedules.length > 0 ? (
                availableSchedules.map((slot) => (
                
                <button
                    key={slot.id}
                    type="button" 
                    className={`time-slot ${selectedScheduleId === slot.id ? 'active' : ''}`}
                    onClick={() => {
                    console.log("Izabran ID termina:", slot.id); 
                    setSelectedScheduleId(slot.id);
                    }}
            >
            {slot.startTime.substring(0, 5)} 
          </button>
        ))
      ) : (
        <p className="error-text">Nema dostupnih termina za ovaj dan.</p>
      )}
    </div>
  </div>
)}
        <button
          className="submit-btn"
          disabled={!isLoggedIn || !selectedService || !selectedDate}
          onClick={handleBooking}
        >
          Rezerviši
        </button>
      </div>
        {showSuccessModal && (
        <div className="modal-overlay">
            <div className="modal-content">
            <div className="success-icon">✔</div>
            <h3>Uspešno rezervisano!</h3>
            <p>Vaš termin je potvrđen. Vidimo se!</p>
            <button className="modal-home-btn" onClick={() => navigate("/")}>Home</button>
            </div>
        </div>
        )}
    </div>
    </div>
  );
}