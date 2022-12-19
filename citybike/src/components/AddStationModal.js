import React, { useState } from 'react'
import Places from './Places'
import { GET_ALL_STATIONS } from '../queries'
import { ADD_STATION } from '../StationMutations'
import { useMutation } from '@apollo/client'
const AddStationModal = () => {
    const [selected, setSelected] = useState({
        lat: 60.1718729,
        lng: 24.9414217,
        zipcode: '00100',
        address: 'Helsingin päärautatieasema, Kaivokatu, Helsinki, Finland',
    })

    // const [name, setName] = useState(selected.address.split(',')[0])
    // const [nimi, setNimi] = useState(selected.address.split(',')[0])
    const [namn, setNamn] = useState('undefined')
    // const [osoite, setOsoite] = useState(selected.address.split(',')[1])
    const [adress, setAdress] = useState('undefined')
    // const [kaupunki, setKaupunki] = useState(selected.address.split(',')[2])
    const [stad, setStad] = useState('undefined')
    const [kapasiteet, setKapasiteet] = useState(10)
    const [operaattor, setOperaattor] = useState('CityBike Finland')
    const [error, setError] = useState('')
    // const [latitude, setLatitude] = useState(selected.lat.toString())
    // const [longitude, setLongitude] = useState(selected.lng.toString())

    const [addStation] = useMutation(ADD_STATION, {
        update(cache, { data: { addStation } }) {
            const { stations } = cache.readQuery({ query: GET_ALL_STATIONS })

            cache.writeQuery({
                query: GET_ALL_STATIONS,
                data: { stations: [...stations, addStation] },
            })
        },
        onError: (error) => {
            setError(error.graphQLErrors[0].message)
        },
        // refetchQueries: [{ query: GET_ALL_STATIONS }],
    })

    const onSubmit = (e) => {
        e.preventDefault()

        // if (!name || !latitude || !longitude || !osoite || !kaupunki) {
        //     return alert('Please fill out all fields')
        // }
        addStation({
            variables: {
                name: selected.address.split(',')[0],
                nimi: selected.address.split(',')[0],
                namn: namn,
                osoite: selected.address.split(',')[1],
                adress: adress,
                kaupunki: selected.address.split(',')[2],
                stad: stad,
                operaattor: operaattor,
                kapasiteet: kapasiteet,
                latitude: selected.lat.toString(),
                longitude: selected.lng.toString(),
            },
        })
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
                            <div>
                                <Places
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </div>
                            <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="name"
                                        value={selected.address.split(',')[0]}
                                        // onChange={(e) =>
                                        //     setName(
                                        //         selected.address.split(',')[0]
                                        //     )
                                        // }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Nimi</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="nimi"
                                        value={selected.address.split(',')[0]}
                                        // onChange={(e) =>
                                        //     setNimi(
                                        //         selected.address.split(',')[0]
                                        //     )
                                        // }
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
                                    <label className="form-label">Osoite</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="osoite"
                                        value={selected.address.split(',')[1]}
                                        // onChange={(e) =>
                                        //     setOsoite(
                                        //         selected.address.split(',')[1]
                                        //     )
                                        // }
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
                                        Kaupunki
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="kaupunki"
                                        value={selected.address.split(',')[2]}
                                        // onChange={(e) =>
                                        //     setKaupunki(
                                        //         selected.address.split(',')[2]
                                        //     )
                                        // }
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
                                        // onChange={(e) =>
                                        //     setLongitude(e.target.value)
                                        // }
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
                                        // onChange={(e) =>
                                        //     setLatitude(e.target.value)
                                        // }
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
