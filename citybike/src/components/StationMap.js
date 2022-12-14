import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { GoogleMap, MarkerF } from '@react-google-maps/api'

const StationMap = ({ x, y }) => {
    const center = useMemo(() => ({ lng: x, lat: y }), [])

    return (
        <GoogleMap zoom={15} center={center}>
            <MarkerF position={center} />
        </GoogleMap>
    )
}

export default StationMap
