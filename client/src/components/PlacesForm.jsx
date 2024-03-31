import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import AccountNav from './AccountNav';
import PhotoUploader from './PhotoUploader';
import Perks from './Perks';

const PlacesForm = () => {

    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckin] = useState('');
    const [checkOut, setCheckout] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);


    // to render details of places with specific id
    useEffect(() => {

        (async () => {
            if (!id) return;
            const response = await axios.get('/places/' + id)
            const { data } = response
            setTitle(data.title)
            setAddress(data.address)
            setAddedPhotos(data.photos)
            setDescription(data.description)
            setPerks(data.perks)
            setExtraInfo(data.extraInfo)
            setCheckin(data.checkIn)
            setCheckout(data.checkOut)
            setMaxGuests(data.maxGuests)
            setPrice(data.price)
        })()

    }, [id])



    //function to add new place(submit the form)
    async function savePlace(ev) {
        ev.preventDefault();
        if (id) {
            // update the place
            await axios.put('/update-place', {
                id, title, address, addedPhotos,
                description, perks, extraInfo,
                checkIn, checkOut, maxGuests, price
            });
            setRedirect(true)
        }

        else {
            // create a new place
            await axios.post('/add-new-place', {
                title, address, addedPhotos,
                description, perks, extraInfo,
                checkIn, checkOut, maxGuests, price
            });
            setRedirect(true)
        }

    }


    if (redirect) {
        return <Navigate to={'/account/places'} />
    }


    return (
        <div>
            <AccountNav />

            <form onSubmit={savePlace}>
                {/* title */}
                <h2 className='text-2xl mt-4'>Title</h2>
                <p className='text-gray-500 text-sm'>Title for your place should be catchy for advertisments</p>
                <input type='text' value={title} onChange={e => setTitle(e.target.value)} placeholder='Enter your apartment name...' />

                {/* Address */}
                <h2 className='text-2xl mt-4'>Address</h2>
                <input type="text" value={address} onChange={e => setAddress(e.target.value)} name="address" id="address" placeholder='Enter your address here...' />

                {/* Photos */}
                <h2 className='text-2xl mt-4'>Photos</h2>
                <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                {/* Description */}
                <h2 className='text-2xl mt-4'>Description</h2>
                <p className='text-gray-500 text-sm'>Put Description to this place here</p>
                <textarea value={description} onChange={e => setDescription(e.target.value)} />

                {/* Perks */}
                <h2 className='text-2xl mt-4'>Perks</h2>
                <p className='text-gray-500 text-sm'>select all the perks of your place</p>
                <div className='grid gap-2 mt-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
                    <Perks selected={perks} onChange={setPerks} />
                </div>

                {/* Extra info */}
                <h2 className='text-2xl mt-4'>Extra info</h2>
                <p className='text-gray-500 text-sm'>house rules etc</p>
                <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)} />

                {/* Check in and Check out and Max Guests */}
                <h2 className='text-2xl mt-4'>Check In & Check Out times</h2>
                <p className='text-gray-500 text-sm'>add check in and check out times, remember to have some cleaning window between guests arrival</p>
                <div className='grid gap-3 sm:grid-cols-2 md:grid-cols-4'>
                    <div>
                        <h3 className='mt-2 mb-1'>Check In time</h3>
                        <input type='text' value={checkIn} onChange={e => setCheckin(e.target.value)} placeholder='14:00' />
                    </div>
                    <div>
                        <h3 className='mt-2 mb-1'>Check Out time</h3>
                        <input type='text' value={checkOut} onChange={e => setCheckout(e.target.value)} placeholder='20:00' />
                    </div>
                    <div>
                        <h3 className='mt-2 mb-1'>Max Number of guests</h3>
                        <input type='text' value={maxGuests} onChange={e => setMaxGuests(e.target.value)} placeholder='5' />
                    </div>
                    <div>
                        <h3 className='mt-2 mb-1'>Price per night (INR) </h3>
                        <input type='text' value={price} onChange={e => setPrice(e.target.value)} placeholder='100' />
                    </div>
                </div>


                <button className='primary my-4'>Save</button>
            </form>
        </div>
    )
}

export default PlacesForm
