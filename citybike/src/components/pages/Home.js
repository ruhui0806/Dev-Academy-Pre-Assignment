import React, { useState } from 'react'
import AddStationModal from '../AddStationModal'
import Places from '../Places'

const Home = () => {
    const [selected, setSelected] = useState({
        lat: 60.1718729,
        lng: 24.9414217,
        zipcode: '00100',
        address: 'Helsingin päärautatieasema, Kaivokatu, Helsinki, Finland',
    })

    return (
        <div>
            <h1>This is the home page</h1>
            <div className="d-flex mb-3 gap-3">
                <AddStationModal />
            </div>
            <div>
                <Places selected={selected} setSelected={setSelected} />
            </div>
        </div>
    )
}

export default Home
