import React from 'react'

import AddStationModal from './AddStationModal'
import AddJourneyModal from './AddJourneyModal'
import Places from './Places'

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'

const Home = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    })
    if (!isLoaded) return <div>Loading...</div>
    return (
        <div>
            <h1>This is the home page</h1>
            <div className="d-flex mb-3 gap-3">
                <AddStationModal />
                <AddJourneyModal />
            </div>
            <div>
                <Places />
            </div>
        </div>
    )
}

export default Home
