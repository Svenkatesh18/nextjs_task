// // pages/index.js (Next.js Frontend)
// 'use client'
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function Home() {
  
//     const [formData, setFormData] = useState({ date: '', time: '', guests: 1, name: '', contact: '' });
//     const [bookings, setBookings] = useState([]);
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');

//     useEffect(() => {
//         axios.get('http://localhost:5000/api/bookings').then(res => setBookings(res.data));
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post('http://localhost:5000/api/bookings', formData);
//             setSuccess('Booking successful!');
//             setError('');
//         } catch (err) {
//           if (err.response && err.response.data && err.response.data.message) {
//             setError(err.response.data.message);
//         } else {
//             setError('An unexpected error occurred. Please try again later.');
//         }
//             setSuccess('');
//         }
//     };
  
//     return (
//         <div>
//             <h1>Restaurant Booking</h1>
//             <form onSubmit={handleSubmit}>
//                     <label>From</label>
//                     <input type="date" name="fromDate" value={formData.fromDate} onChange={handleChange} required />
//                     <label>To</label>
//                     <input type="date" name="tooDate" value={formData.tooDate} onChange={handleChange} required />
//                     <input type="time" name="time" value={formData.time} onChange={handleChange} required />
//                     <input type="number" name="guests" value={formData.guests} onChange={handleChange} required />
//                     <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
//                     <input type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact" required />
//                     <button type="submit">Book Now</button>
//                 </form>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             {success && <p style={{ color: 'green' }}>{success}</p>}
//             <h2>Current Bookings</h2>
//             <ul>
//                 {bookings.map(booking => (
//                     <li key={booking.id}>{booking.date} - {booking.time} - {booking.name}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// } 

'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
    const [formData, setFormData] = useState({ fromDate: '', toDate: '', time: '', guests: 1, name: '', contact: '' });
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/bookings').then(res => setBookings(res.data));
    }, []);

//     useEffect(() => { 
//     if (formData.fromDate) {
//       const unavailableSlots = bookings.filter(booking => booking.fromDate === formData.fromDate).map(booking => booking.time);
//       const availableTimeSlots = allTimeSlots.filter(slot => !unavailableSlots.includes(slot));
//       availableTimeSlots(availableTimeSlots);
//   }
// }, [formData.fromDate, bookings]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // if (name === 'fromDate' || name === 'toDate') {
    //   const from = new Date(formData.fromDate);
    //   const to = new Date(value);
    //   if (from && to && from <= to) {
    //       setDays(Math.ceil((to - from) / (1000 * 3600 * 24))); // Calculate days
    //   }
    //}
  

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (new Date(formData.fromDate) > new Date(formData.toDate)) {
            setError('From date must be before To date.');
            setSuccess('');
            return;
        }
        try {
            await axios.post('http://localhost:5000/api/bookings', formData);
            setSuccess('Booking successful!');
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
            setSuccess('');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                <h1 className="text-center mb-4" style={{ color: '#ffc107' }}>The Cozy Cafe</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Date</label>
                        <input type="date" name="fromDate" value={formData.fromDate} onChange={handleChange} className="form-control" required />
                    </div>
                    {/* <div className="mb-3">
                        <label className="form-label">To</label>
                        <input type="date" name="toDate" value={formData.toDate} onChange={handleChange} className="form-control" required />
                    </div> */}
                    <div className="mb-3">
                        <label className="form-label">Time</label>
                        <input type="time" name="time" value={formData.time} onChange={handleChange} className="form-control" required />
                    </div>
                    {/* <div className="mb-3">
                            <label className="form-label">Time</label>
                            <select 
                                name="time" 
                                value={formData.time} 
                                onChange={handleChange} 
                                className="form-control" 
                                required
                            >
                                <option value="">Select Time</option>
                                {availableTimeSlots.map((slot, index) => (
                                    <option key={index} value={slot}>{slot}</option>
                                ))}
                            </select>
                        </div> */}
                    <div className="mb-3">
                        <label className="form-label">Guests</label>
                        <input type="number" name="guests" value={formData.guests} onChange={handleChange} className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contact</label>
                        <input type="text" name="contact" value={formData.contact} onChange={handleChange} className="form-control" required />
                    </div>
                    <button type="submit" className="btn btn-warning w-100">Reserve Now</button>
                </form>
                {error && <p className="text-danger mt-3">{error}</p>}
                {success && <p className="text-success mt-3">{success}</p>}
            </div>
        </div>
    );
}

// THODA SA TEDHA HAI YEH 
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

// export default function Home() {
//     const [formData, setFormData] = useState({ fromDate: '', toDate: '', time: '', guests: 1, name: '', contact: '' });
//     const [bookings, setBookings] = useState([]);
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const [days, setDays] = useState(0); // New state for calculating days

//     useEffect(() => {
//         axios.get('http://localhost:5000/api/bookings').then(res => setBookings(res.data));
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
        
//         // Calculate days between selected fromDate and toDate
//         if (name === 'fromDate' || name === 'toDate') {
//             const from = new Date(formData.fromDate);
//             const to = new Date(value);
//             if (from && to && from <= to) {
//                 setDays(Math.ceil((to - from) / (1000 * 3600 * 24))); // Calculate days
//             }
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (new Date(formData.fromDate) > new Date(formData.toDate)) {
//             setError('From date must be before To date.');
//             setSuccess('');
//             return;
//         }
//         try {
//             await axios.post('http://localhost:5000/api/bookings', formData);
//             setSuccess('Booking successful!');
//             setError('');
//         } catch (err) {
//             setError(err.response?.data?.message || 'Your Booking Succuessful');
//             setSuccess('');
//         }
//     };

//     const isToDateDisabled = (toDate) => new Date(toDate) < new Date(formData.fromDate); // Disable toDate if it's before fromDate

//     return (
//         <div style={{ backgroundImage: 'url(/bgimage.jpg)', backgroundSize: 'cover', filter: 'blur(0.3px)', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
//             <div className="container d-flex justify-content-center align-items-center vh-100" style={{ margin: '0 10%', position: 'relative' }}>
//                 <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
//                     <h1 className="text-center mb-4">GO - trippie - GO</h1>
//                     <form onSubmit={handleSubmit}>
//                         <div className="mb-3">
//                             <label className="form-label">Date</label>
//                             <input type="date" name="fromDate" value={formData.fromDate} onChange={handleChange} className="form-control" required />
//                         </div>
//                         {/* <div className="mb-3">
//                             <label className="form-label">To</label>
//                             <input 
//                                 type="date" 
//                                 name="toDate" 
//                                 value={formData.toDate} 
//                                 onChange={handleChange} 
//                                 className="form-control" 
//                                 required 
//                                 min={formData.fromDate} // Ensure toDate is after fromDate
//                                 disabled={isToDateDisabled(formData.toDate)} 
//                             />
//                         </div> */}
//                         <div className="mb-3">
//                             <label className="form-label">Time</label>
//                             <input type="time" name="time" value={formData.time} onChange={handleChange} className="form-control" required />
//                         </div>
//                         {/* <div className="mb-3">
//                             <label className="form-label">Days</label>
//                             <input type="text" value={days} readOnly className="form-control" />
//                         </div> */}
//                         <div className="mb-3">
//                             <label className="form-label">Guests</label>
//                             <input type="number" name="guests" value={formData.guests} onChange={handleChange} className="form-control" required />
//                         </div>
//                         <div className="mb-3">
//                             <label className="form-label">Name</label>
//                             <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
//                         </div>
//                         <div className="mb-3">
//                             <label className="form-label">Contact</label>
//                             <input type="text" name="contact" value={formData.contact} onChange={handleChange} className="form-control" required />
//                         </div>
//                         <button type="submit" className="btn btn-warning w-100">Reserve Now</button>
//                     </form>
//                     {error && <p className="text-danger mt-3">{error}</p>}
//                     {success && <p className="text-success mt-3">{success}</p>}
//                 </div>
//             </div>
//         </div>
//     );
// }












// -------------------------------------------------
// import Image from 'next/image'
// import styles from './page.module.css'

// export default function Home() {
//   return (
//     <main><h1>Hello world</h1></main>
//   )
// }
