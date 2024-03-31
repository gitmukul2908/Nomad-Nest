import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Home = () => {

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get('/places')
      const { data } = response
      setPlaces(data)
    })()
  }, [])

  return (
    <div className='mt-8 gap-x-8 gap-y-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {places.length > 0 && places.map(place => (
        <Link to={'/places/' + place._id} key={place._id}>
          <div className='bg-gray-500 mb-2 rounded-2xl flex'>
            {place.photos[0] && (
              <img className='rounded-2xl object-cover aspect-square' src={'http://localhost:5000/uploads/' + place.photos[0]} />
            )}
          </div>
          <h2 className='font-bold'>{place.address}</h2>
          <h2 className='text-sm truncate text-gray-500'>{place.title}</h2>
          <h2 className='text-gray-700 mt-2'><span className='font-bold'>{place.price} INR</span> per night</h2>
        </Link>
      ))}
    </div>
  )
}

export default Home
