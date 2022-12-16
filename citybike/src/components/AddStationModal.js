import React, { useState } from 'react'
import Places from './Places'
import { ADD_STATION } from '../StationMutations'
import { GET_ALL_STATIONS } from '../queries'
import { useMutation } from '@apollo/client'
const AddStationModal = () => {
    const [selected, setSelected] = useState({
        lat: 60.1718729,
        lng: 24.9414217,
        zipcode: '00100',
        address: 'Helsingin päärautatieasema, Kaivokatu, Helsinki, Finland',
    })

    const [name, setName] = useState(selected.address.split(',')[0])
    const [namn, setNamn] = useState('')
    const [osoite, setOsoite] = useState(selected.address.split(',')[1])
    const [adress, setAdress] = useState('')
    const [kaupunki, setKaupunki] = useState(
        selected.address.split(',').slice(-2, -1)
    )
    const [stad, setStad] = useState('')
    const [latitude, setLatitude] = useState(selected.lat)
    const [longitude, setLongitude] = useState(selected.lng)
    const [kapasiteet, setKapasiteet] = useState(0)
    const [operaattor, setOperaattor] = useState('CityBike Finland')
    // const [addStation] = useMutation(ADD_STATION, {
    //     variables: {
    //         Name: name,
    //         Nimi: name,
    //         Namn: namn,
    //         Osoite: osoite,
    //         Adress: adress,
    //         Kaupunki: kaupunki,
    //         Stad: stad,
    //         y: latitude,
    //         x: longitude,
    //         Kapasiteet: kapasiteet,
    //         Operaattor: operaattor,
    //     },
    //     update(cache, { data: { addStation } }) {
    //         const { stations } = cache.readQuery({ query: GET_ALL_STATIONS })

    //         cache.writeQuery({
    //             query: GET_ALL_STATIONS,
    //             data: { stations: [...stations, addStation] },
    //         })
    //     },
    // })
    const [addStation] = useMutation(ADD_STATION, {
        variables: {
            Name: name,
            Nimi: name,
            Namn: namn,
            Osoite: osoite,
            Adress: adress,
            Kaupunki: kaupunki,
            Stad: stad,
            y: latitude,
            x: longitude,
            Kapasiteet: kapasiteet,
            Operaattor: operaattor,
        },
        // refetchQueries: [{ query: GET_ALL_STATIONS }],
        update(cache, { data: { addStation } }) {
            const { stations } = cache.readQuery({ query: GET_ALL_STATIONS })

            console.log('query: GET_ALL_STATIONS-1', cache)
            cache.writeQuery({
                query: GET_ALL_STATIONS,
                data: { stations: [...stations, addStation] },
            })
            console.log('query: GET_ALL_STATIONS-2', cache)
        },
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (
            name === '' ||
            kaupunki === '' ||
            longitude === undefined ||
            latitude === undefined
        ) {
            return alert('Please fill in all fields')
        }
        addStation(
            name,
            namn,
            osoite,
            adress,
            kaupunki,
            stad,
            latitude,
            longitude,
            kapasiteet,
            operaattor
        )
    }

    return (
        <div>
            <button
                type="button"
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
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="Name"
                                        value={selected.address.split(',')[0]}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Namn</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="Namn"
                                        value={namn}
                                        onChange={(e) =>
                                            setNamn(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Osoite</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="Osoite"
                                        value={selected.address.split(',')[1]}
                                        onChange={(e) =>
                                            setOsoite(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Adress</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="Adress"
                                        value={adress}
                                        onChange={(e) =>
                                            setAdress(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Kaupunki
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="Kaupunki"
                                        value={selected.address
                                            .split(',')
                                            .slice(-2, -1)}
                                        onChange={(e) =>
                                            setKaupunki(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Stad</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="Stad"
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
                                        type="number"
                                        id="x"
                                        value={selected.lng}
                                        onChange={(e) =>
                                            setLongitude(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Latitude
                                    </label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        id="y"
                                        value={selected.lat}
                                        onChange={(e) =>
                                            setLatitude(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Capacity
                                    </label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        id="Kapasiteet"
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
                                        id="Operaattor"
                                        value={operaattor}
                                        onChange={(e) =>
                                            setOperaattor(e.target.value)
                                        }
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary mb-3"
                                    data-bs-dismiss="modal"
                                >
                                    Submit
                                </button>
                            </form>
                            <div>
                                <Places
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddStationModal
