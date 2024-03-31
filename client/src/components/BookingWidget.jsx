import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import {differenceInCalendarDays} from "date-fns"
import axios from "axios"


const BookingWidget = (props) => {
    const { placeData } = props
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [redirect, setRedirect] = useState('')

    let numberOfDays = 0;
    if (checkIn && checkOut) {
        numberOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    async function handleBooking(ev) {
        ev.preventDefault();
        const response = await axios.post('/bookings', {
            place: placeData._id, checkIn, checkOut, numberOfGuests, name,
            phone, price: numberOfDays * placeData.price
        })
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`)
    }

    if (redirect) {
       return <Navigate to={redirect} />
    }

    return (

        <div className='bg-white shadow rounded-2xl p-4'>
            <h2 className='text-2xl text-center'>Price: {placeData.price} / per night</h2>

            <div className='mb-2 border shadow border-gray-400 rounded-2xl mt-4'>
                <div className="flex">
                    <div className='py-3 px-4'>
                        <label>CheckIn: </label>
                        <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
                    </div>
                    <div className='py-3 px-4 border-gray-400 border-l'>
                        <label>CheckOut: </label>
                        <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
                    </div>
                </div>

                <div className='py-3 px-4 border-gray-400 border-t'>
                    <label>Number of Guests: </label>
                    <br />
                    <input type="number" value={numberOfGuests} onChange={e => setNumberOfGuests(e.target.value)} />
                </div>

                {numberOfDays > 0 && (
                    <div className='px-3 py-4 border-t'>
                        <label>Your Full Name: </label>
                        <br />
                        <input type="text" value={name} onChange={e => setName(e.target.value)} />
                        <label>Your Phone Number: </label>
                        <br />
                        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} />

                    </div>
                )}

            </div>

            <button onClick={handleBooking} disabled={numberOfDays <= 0} className='primary'>
                Book Now
                {numberOfDays > 0 && (
                    <span className='mx-2 font-semibold'>INR {numberOfDays * placeData.price}</span>
                )}
            </button>

        </div>
    )
}

export default BookingWidget
