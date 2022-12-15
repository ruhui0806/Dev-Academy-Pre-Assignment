import React, { useState } from 'react'
import AddStationModal from './AddStationModal'
import AddJourneyModal from './AddJourneyModal'
import Places from './Places'
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api'

const Home = () => {
    const [selected, setSelected] = useState({
        lat: 60.1718729,
        lng: 24.9414217,
        zipcode: '00100',
        address: 'Helsingin päärautatieasema, Kaivokatu, Helsinki, Finland',
    })

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
                <Places selected={selected} setSelected={setSelected} />
            </div>
        </div>
    )
}

export default Home
