import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import PlaceGallery from './PlaceGallery'
import BookingDates from './BookingDates'

const BookingPage = () => {
    const { id } = useParams()
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        (async () => {
            if (id) {
                const response = await axios.get('/bookings')
                const foundBooking = response.data.find(({ _id }) => _id === id)
                if (foundBooking) {
                    setBooking(foundBooking)
                }
            }
        })()

    }, [id])

    if (!booking) return '';

    return (
        <div className='mt-4 -mx-4 px-8 pt-8'>

            <h1 className='text-3xl'>{booking.place.title}</h1>


            <div className='my-3 flex gap-1 items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <a className='block underline font-bold' target='_blank' href={`https://maps.google.com/?q=${booking.place.address}`}>{booking.place.address}</a>
            </div>

            <div className='bg-gray-200 p-4 mb-4 rounded-2xl flex items-center justify-between'>
                <div>
                    <h2 className='text-xl'>Your Booking Information</h2>
                    {/* Booking Dates Component */}
                    <BookingDates booking={booking} />
                </div>

                <div className='bg-primary text-white rounded-2xl p-6'>
                    <div>Total Price</div>
                    <div className='text-3xl'>INR {booking.price}</div>
                </div>

            </div>


            {/* PlaceGallery Component */}
            <PlaceGallery placeData={booking.place} />

            <div className='bg-white -mx-8 px-8 py-8 my-4 border-t'>
                <div className='font-semibold text-2xl'>Extra Info</div>
                <div className='text-sm mb-4 mt-2 text-gray-700 leading-4'>IMPORTANT NOTICE: {booking.place.extraInfo}</div>
            </div>
        </div>
    )
}

export default BookingPage
