import React, { useState } from 'react'

import { GET_STATION, GET_ALL_STATIONS } from '../queries/queries'
import { UPDATE_STATION } from '../queries/StationMutations'
import { useMutation } from '@apollo/client'

const UpdateStationModal = ({ station }) => {
    //new-station-related variables:
    const [name, setName] = useState(station.Name)
    const [nimi, setNimi] = useState(station.Nimi)
    const [namn, setNamn] = useState(station.Namn)
    const [adress, setAdress] = useState(station.Adress)
    const [osoite, setOsoite] = useState(station.Osoite)
    const [kaupunki, setKaupunki] = useState(station.Kaupunki)
    const [stad, setStad] = useState(station.Stad)
    const [kapasiteet, setKapasiteet] = useState(station.Kapasiteet)
    const [operaattor, setOperaattor] = useState('CityBike Finland')
    const [error, setError] = useState('')

    //add station query-mutations:
    const [updateStation] = useMutation(UPDATE_STATION, {
        variables: {
            ID: parseInt(station.ID),
            name,
            nimi,
            namn,
            osoite,
            adress,
            kaupunki,
            stad,
            operaattor,
            kapasiteet,
        },
        refetchQueries: [
            // { query: GET_ALL_STATIONS },
            { query: GET_STATION, variables: { idd: station.ID } },
        ],
        onError: (error) => {
            setError(error)
        },
    })
    //submit add station form function:
    const onSubmit = (e) => {
        e.preventDefault()
        console.log(station.ID, station.id)
        if (name === '' || nimi === '' || osoite === '') {
            return alert('Please fill all the required fields')
        }
        console.log('debug 1')
        updateStation({
            name,
            nimi,
            namn,
            osoite,
            adress,
            kaupunki,
            stad,
            operaattor,
            kapasiteet,
        })
        console.log('debug 2')
    }
    return (
        <div>
            <button
                type="button"
                id="updateStationBtn"
                className="btn btn-secondary"
                data-bs-toggle="modal"
                data-bs-target="#updateStationModal"
            >
                <div className="d-flex align-items-center">
                    <div>Update Station</div>
                </div>
            </button>
            <div
                className="modal fade"
                id="updateStationModal"
                aria-labelledby="updateStationModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="updateStationModalLabel"
                            >
                                Update current Bicycle Station
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>

                        <div className="modal-body">
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
                                        value={kaupunki}
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
                                        value={station.x}
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
                                        value={station.y}
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

export default UpdateStationModal
