import React, { useState } from 'react'
import AddStationModal from '../AddStationModal'
import Places from '../places/Places'
import { GET_MAP_API_KEY } from '../../queries/queries.js'
import { useQuery } from '@apollo/client'
import LoadingSpinner from '../LoadingSpinner'
const Home = () => {
    const [selected, setSelected] = useState({
        lat: 60.1718729,
        lng: 24.9414217,
        zipcode: '00100',
        address: 'Helsingin päärautatieasema, Kaivokatu, Helsinki, Finland',
    })

    const { data, loading, error } = useQuery(GET_MAP_API_KEY)
    if (error) return <p>Something Went Wrong</p>
    if (loading) return <LoadingSpinner />
    // const mapApiKey = !loading && !error && data.mapApiKey
    return (
        <div>
            {!loading && !error && (
                <>
                    <h1>This is the home page</h1>
                    <div className="d-flex mb-3 gap-3">
                        <AddStationModal />
                    </div>
                    <div>
                        <Places
                            selected={selected}
                            setSelected={setSelected}
                            mapApiKey={data.mapApiKey}
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default Home
