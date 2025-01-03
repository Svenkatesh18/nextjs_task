// app.js (Node.js with Express Backend)
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let bookings = [];

// Create Booking
app.post('/api/bookings', (req, res) => {
    const { date, time, guests, name, contact } = req.body;
    if (!fromDate || !tooDate || !time || !guests || !name || !contact) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    if (new Date(fromDate) > new Date(tooDate)) {
        return res.status(400).json({ message: 'From date must be before To date.' });
    }
    
    const isSlotTaken = bookings.some(booking => booking.fromDate === fromDate && booking.tooDate === tooDate && booking.time === time);
    if (isSlotTaken) {
        return res.status(400).json({ message: 'This slot is already booked.' });
    }
    
    const newBooking = { id: Date.now(), date, time, guests, name, contact };
    bookings.push(newBooking);
    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
});

// Get Bookings
app.get('/api/bookings', (req, res) => {
    res.status(200).json(bookings);
});

// Delete Booking
app.delete('/api/bookings/:id', (req, res) => {
    const { id } = req.params;
    bookings = bookings.filter(booking => booking.id !== parseInt(id));
    res.status(200).json({ message: 'Booking deleted successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});