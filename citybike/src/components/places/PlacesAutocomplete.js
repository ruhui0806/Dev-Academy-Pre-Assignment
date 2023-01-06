import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
    getZipCode,
} from 'use-places-autocomplete'
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from '@reach/combobox'
import '@reach/combobox/styles.css'

//define autocomplete input place:
const PlacesAutocomplete = ({ setSelected }) => {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete()

    //handle selected location:
    const handleSelect = async (address) => {
        setValue(address, false)
        clearSuggestions()

        const results = await getGeocode({ address })
        const { lat, lng } = await getLatLng(results[0])
        const zipcode = await getZipCode(results[0])
        setSelected({ address, lat, lng, zipcode })
    }

    return (
        <Combobox onSelect={handleSelect}>
            <ComboboxInput
                className="pac-container combobox-input form-control"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={!ready}
                placeholder="Search an address"
            />
            <ComboboxPopover portal={false} id="popover">
                <ComboboxList>
                    {status === 'OK' &&
                        data.map(({ place_id, description }) => (
                            <ComboboxOption
                                key={place_id}
                                value={description}
                            />
                        ))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    )
}

export default PlacesAutocomplete
