import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
const StationMap = () => {
    return (
        <div>
            <div className="map-container">This is the map container</div>
            <div className="ratio ratio-16x9">
                <iframe
                    src="https://www.avoindata.fi/data/en_GB/dataset/hsl-n-kaupunkipyoraasemat/resource/eed64d92-c63a-412a-aab9-e006aea49732/view/a70b79fb-d393-466a-8f18-226c945ff477"
                    api-key="dbebdd5c-e4eb-4308-b39d-65d8180a858d"
                />
            </div>
            <Link to="/stations" className="btn btn-primary">
                Go Back
            </Link>
        </div>
    )
}

export default StationMap
