import React, { useState } from 'react'
import Places from './places/Places'
import { GET_ALL_STATIONS } from '../queries/queries'
import { ADD_STATION } from '../queries/StationMutations'
import { useMutation } from '@apollo/client'
const AddStationModal = () => {
    //autocomplete-form related variables:
    const [selected, setSelected] = useState({
        lat: 60.1718729,
        lng: 24.9414217,
        zipcode: '00100',
        address: 'Helsingin päärautatieasema, Kaivokatu 1, Helsinki, Finland',
    })

    //new-station-related variables:
    const [name, setName] = useState('')
    const [nimi, setNimi] = useState('')
    const [namn, setNamn] = useState('')
    const [adress, setAdress] = useState('')
    const [osoite, setOsoite] = useState('')
    const [stad, setStad] = useState('')
    const [kapasiteet, setKapasiteet] = useState(10)
    const [operaattor, setOperaattor] = useState('CityBike Finland')
    const [error, setError] = useState('')

    //submit add station form function:
    const onSubmit = (e) => {
        e.preventDefault()
        console.log(selected.address)
        if (name === '' || nimi === ' ' || osoite === ' ') {
            return alert('Please fill all the required fields')
        }
        addStation({
            variables: {
                name: name,
                nimi: nimi,
                namn: namn,
                osoite: osoite,
                adress: adress,
                kaupunki: selected.address.split(',').reverse()[1],
                stad: stad,
                operaattor: operaattor,
                kapasiteet: kapasiteet,
                latitude: selected.lat.toString(),
                longitude: selected.lng.toString(),
            },
        })
    }
    //add station query-mutations:
    const [addStation] = useMutation(ADD_STATION, {
        update(cache, { data: { addStation } }) {
            const { stations } = cache.readQuery({ query: GET_ALL_STATIONS })
            cache.writeQuery({
                query: GET_ALL_STATIONS,
                data: { stations: [...stations, addStation] },
            })
        },
        onError: (error) => {
            setError(error)
        },
    })

    return (
        <div>
            <button
                type="button"
                id="addStationBtn"
                className="btn btn-secondary"
                data-bs-toggle="modal"
                data-bs-target="#addStationModal"
            >
                <div className="d-flex align-items-center">
                    <div>Add Station</div>
                </div>
            </button>
            <div
                className="modal fade"
                id="addStationModal"
                aria-labelledby="addStationModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="addStationModalLabel"
                            >
                                Add New Bicycle Station
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>

                        <div className="modal-body">
                            <div>
                                <Places
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </div>
                            <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Name{' '}
                                        <span style={{ color: 'red' }}>
                                            (* required)
                                        </span>{' '}
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        // readOnly
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Nimi{' '}
                                        <span style={{ color: 'red' }}>
                                            (* required)
                                        </span>{' '}
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="nimi"
                                        value={nimi}
                                        onChange={(e) =>
                                            setNimi(e.target.value)
                                        }
                                        // readOnly
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Namn</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="namn"
                                        value={namn}
                                        onChange={(e) =>
                                            setNamn(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Osoite{' '}
                                        <span style={{ color: 'red' }}>
                                            (* required)
                                        </span>{' '}
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="osoite"
                                        value={osoite}
                                        onChange={(e) =>
                                            setOsoite(e.target.value)
                                        }
                                        // readOnly
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Adress</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="adress"
                                        value={adress}
                                        onChange={(e) =>
                                            setAdress(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Kaupunki{' '}
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="kaupunki"
                                        value={
                                            selected.address
                                                .split(',')
                                                .reverse()[1]
                                        }
                                        readOnly
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Stad</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="stad"
                                        value={stad}
                                        onChange={(e) =>
                                            setStad(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Longitude
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="longitude"
                                        value={selected.lng}
                                        readOnly
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Latitude
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="latitude"
                                        value={selected.lat}
                                        readOnly
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Capacity
                                    </label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        id="kapasiteet"
                                        value={kapasiteet}
                                        onChange={(e) =>
                                            setKapasiteet(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Operator
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="operaattor"
                                        value={operaattor}
                                        onChange={(e) =>
                                            setOperaattor(e.target.value)
                                        }
                                    />
                                </div>
                                <button
                                    id="submit"
                                    type="submit"
                                    className="btn btn-primary mb-3"
                                    data-bs-dismiss="modal"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddStationModal
