import { Link } from 'react-router-dom'
import AccountNav from './AccountNav'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Places = () => {

    const [placeData, setPlaceData] = useState([]);

    useEffect(() => {
        (async () => {
            const { data } = await axios.get('/user-places');
            setPlaceData(data);
        })()
    }, [])


    return (
        <div>
            {/* Add a new place */}
            <AccountNav />


            <div className='text-center'>
                <br />
                <Link className='inline-flex gap-2 text-xl bg-primary text-white py-2 px-6 rounded-full' to={'/account/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-7">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                    </svg>

                    Add new place

                </Link>
            </div>

            {/* Display all the places */}
            <div className='mt-4'>
                {placeData.length > 0 && placeData.map(place => (
                    <Link to={'/account/places/' + place._id} key={place._id}>
                        <div className='flex gap-3 bg-gray-200 p-2 rounded-2xl mt-4 cursor-pointer'>
                            <div className='flex bg-gray-300 rounded-xl w-32 h-32'>
                                {place.photos.length > 0 && (
                                    <img className='center' src={'http://localhost:5000/uploads/' + place.photos[0]} />
                                )}
                            </div>
                            <div>
                                <h2 className='text-2xl font-semibold'>{place.title}</h2>
                                <p>{place.description}</p>
                            </div>
                        </div>

                    </Link>
                ))}
            </div>


        </div>
    )
}

export default Places
