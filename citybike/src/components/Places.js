import { useState, useMemo } from 'react'
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api'
import PlacesAutocomplete from './PlacesAutocomplete'
import LoadingSpinner from './LoadingSpinner'

//define map functional component
function Map() {
    const [selected, setSelected] = useState({
        lat: 60.16310319166,
        lng: 24.9459599998806,
    })
    const center = useMemo(() => selected, [])
    console.log('selected:', selected)
    return (
        <div className="mb-3">
            <div className="mb-3">
                <PlacesAutocomplete setSelected={setSelected} />
            </div>
            <div className="ratio ratio-16x9 mb-3">
                <GoogleMap zoom={10} center={center}>
                    {selected && <MarkerF position={selected} />}
                </GoogleMap>
            </div>
        </div>
    )
}
//define final functional component combining map and autocomplete components:
export default function Places() {
    const libraries = ['places']
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        libraries,
    })

    if (!isLoaded) return <LoadingSpinner />
    return <div>{isLoaded && <Map />}</div>
}
