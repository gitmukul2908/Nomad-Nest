import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BookingWidget from './BookingWidget';
import PlaceGallery from './PlaceGallery';

const PlacePage = () => {
  const { id } = useParams();
  const [placeData, setPlaceData] = useState(null)
 
  useEffect(() => {
    (async () => {

      if (!id) {
        return;
      }

      const response = await axios.get(`/places/${id}`)
      setPlaceData(response.data)

    })()
  }, [id])

  if (!placeData) return;

  return (
    <div className='mt-4 bg-gray-100 -mx-4 px-8 pt-8'>

      <h1 className=' text-3xl'>{placeData.title}</h1>
      <div className='mt-2 flex gap-1 items-center'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
        <a className='block underline font-bold' target='_blank' href={`https://maps.google.com/?q=${placeData.address}`}>{placeData.address}</a>
      </div>

      {/* PlaceGallery Component */}
      <PlaceGallery placeData={placeData}/>

      <div className='grid grid-cols-[2fr_1fr] gap-8 mt-8'>
        <div>
          <div className='my-4'>
            <div className='font-semibold text-2xl'>Description</div>
            {placeData.description}
          </div>
          Check-in: {placeData.checkIn} <br />
          Check-out: {placeData.checkOut} <br />
          Max number of guests: {placeData.maxGuests} <br />
        </div>

        {/* Booking widget */}
        <BookingWidget placeData={placeData}/>

      </div>

      <div className='bg-white -mx-8 px-8 py-8 my-4 border-t'>
        <div className='font-semibold text-2xl'>Extra Info</div>
        <div className='text-sm mb-4 mt-2 text-gray-700 leading-4'>IMPORTANT NOTICE: {placeData.extraInfo}</div>
      </div>
    </div>
  )
}

export default PlacePage
