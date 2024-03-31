import React, { useState } from 'react'

const PlaceGallery = (props) => {
    const { placeData } = props
    const [showAllPhotos, setshowAllPhotos] = useState(false)

    // to show all photos
    if (showAllPhotos) {
        return (
            <div className='absolute inset-0 bg-white min-h-screen'>
                <div className='p-8 grid gap-2'>
                    <div>
                        <h2 className='text-3xl'>Photos of {placeData.title}</h2>
                        <button onClick={() => setshowAllPhotos(false)} className='fixed right-0 top-0 p-3 m-2 shadow shadow-gray-500 bg-opacity-90 bg-gray-500 rounded-full'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>
                    </div>
                    {placeData?.photos?.length > 0 && placeData.photos.map(photo => (
                        <div key={photo}>
                            <img src={`http://localhost:5000/uploads/${photo}`} />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className='relative'>
            <div className='mt-2 grid gap-2 grid-cols-[2fr_1fr]'>
                <div>
                    {placeData.photos[0] && (
                        <img onClick={() => setshowAllPhotos(true)} className='cursor-pointer rounded-l-2xl aspect-square object-cover' src={`http://localhost:5000/uploads/${placeData.photos[0]}`} />
                    )}
                </div>
                <div className='grid'>
                    {placeData.photos[1] && (
                        <img onClick={() => setshowAllPhotos(true)} className='cursor-pointer rounded-r-2xl aspect-square object-cover' src={`http://localhost:5000/uploads/${placeData.photos[1]}`} />
                    )}
                    <div className='overflow-hidden'>
                        {placeData.photos[2] && (
                            <img onClick={() => setshowAllPhotos(true)} className='cursor-pointer rounded-r-2xl aspect-square object-cover relative top-2' src={`http://localhost:5000/uploads/${placeData.photos[2]}`} />
                        )}
                    </div>
                </div>
            </div>

            {placeData.photos.length > 2 && (
                <button onClick={() => setshowAllPhotos(true)} className='rounded-sm absolute flex gap-2 bg-primary text-white p-2 right-0 bottom-0'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>

                    Show more photos
                </button>
            )}

        </div>
    )
}

export default PlaceGallery
