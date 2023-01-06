import { useState, useMemo } from 'react'
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api'
import PlacesAutocomplete from './PlacesAutocomplete'
import LoadingSpinner from '../LoadingSpinner'

//define map-view functional component
function Map({ selected, setSelected }) {
    const center = useMemo(() => selected, [selected])
    return (
        <div className="mb-3">
            <div className="mb-3">
                <PlacesAutocomplete setSelected={setSelected} />
            </div>
            <p>
                Address: {selected.address}; Latitude: {selected.lat};
                Longitude: {selected.lng}; Post Code: {selected.zipcode}
            </p>
            <div className="ratio ratio-16x9 mb-3">
                <GoogleMap zoom={10} center={center}>
                    {selected && <MarkerF position={selected} />}
                </GoogleMap>
            </div>
        </div>
    )
}

//define final map functional component combining map and autocomplete components:
export default function Places({ selected, setSelected }) {
    const [libraries] = useState(['places'])
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        libraries,
    })

    if (!isLoaded) return <LoadingSpinner />
    return (
        <div>
            {isLoaded && <Map selected={selected} setSelected={setSelected} />}
        </div>
    )
}
