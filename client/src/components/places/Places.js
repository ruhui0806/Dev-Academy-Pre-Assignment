import { useState, useMemo } from 'react'
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api'
import PlacesAutocomplete from './PlacesAutocomplete'
import LoadingSpinner from '../LoadingSpinner'

//define map-view functional component
function Map({ selected, setSelected }) {
    const center = useMemo(() => selected, [selected])
    const style = { fontWeight: 'bold' }

    return (
        <div className="mb-3">
            <div className="mb-3">
                <PlacesAutocomplete setSelected={setSelected} />
            </div>
            <p>
                <span style={style}>Address:</span> {selected.address}
                <br />
                <span style={style}>Latitude:</span> {selected.lat}
                <br />
                <span style={style}>Longitude:</span> {selected.lng}
                <br />
                <span style={style}>Post Code:</span> {selected.zipcode}
            </p>
            <div className="ratio ratio-16x9 mb-3">
                <GoogleMap zoom={16} center={center}>
                    {selected && <MarkerF position={selected} />}
                </GoogleMap>
            </div>
        </div>
    )
}

//define final map functional component combining map and autocomplete components:
export default function Places({ selected, setSelected, mapApiKey }) {
    const [libraries] = useState(['places'])

    const { isLoaded } = useLoadScript({
        // googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        libraries,
        googleMapsApiKey: mapApiKey,
    })

    if (!isLoaded) return <LoadingSpinner />

    return (
        <div>
            {{ isLoaded } && (
                <Map selected={selected} setSelected={setSelected} />
            )}
        </div>
    )
}
