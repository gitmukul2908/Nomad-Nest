const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
    user: { type: mongoose.Schema.Types.ObjectId },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    numberOfGuests: { type: Number, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    price: { type: Number, required: true }
})

const BookingModel = mongoose.model('Booking', bookingSchema)

module.exports = BookingModel;
