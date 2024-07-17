// frontend/src/App.js
import React, { useState, useEffect } from 'react';

function App() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ patient_id: '', date: '', time: '' });

  useEffect(() => {
    fetch('http://localhost:5000/appointments')
      .then(response => response.json())
      .then(data => setAppointments(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then(response => response.json())
      .then(data => {
        setAppointments([...appointments, data]);
        setForm({ patient_id: '', date: '', time: '' });
      });
  };

  return (
    <div>
      <h1>Book an Appointment</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Patient ID:
          <input type="number" name="patient_id" value={form.patient_id} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Date:
          <input type="date" name="date" value={form.date} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Time:
          <input type="time" name="time" value={form.time} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Book Appointment</button>
      </form>
      <h2>Appointments</h2>
      <ul>
        {appointments.map((appointment, index) => (
          <li key={index}>
            Patient ID: {appointment.patient_id}, Date: {appointment.date}, Time: {appointment.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
