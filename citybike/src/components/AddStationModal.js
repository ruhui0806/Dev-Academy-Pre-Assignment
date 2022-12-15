import React, { useState } from 'react'
import Places from './Places'

const AddStationModal = () => {
    const useField = (type) => {
        const [value, setValue] = useState('')
        const onChange = (event) => {
            setValue(event.target.value)
        }
        return {
            type,
            value,
            onChange,
        }
    }
    const location = useField('text')

    const [selected, setSelected] = useState({
        lat: 60.1718729,
        lng: 24.9414217,
        zipcode: '00100',
        address: 'Helsingin päärautatieasema, Kaivokatu, Helsinki, Finland',
    })
    const splitAddress = selected.address.split(',')
    location.name = splitAddress[0]
    location.kaupunki = splitAddress.slice(-2, -1)
    location.latitude = selected.lat
    location.longitude = selected.lng

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('this is handle submit function for adding new station')
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
                                        type={location.type}
                                        id="Name"
                                        value={location.name}
                                        onChange={location.onChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Address
                                    </label>
                                    <input
                                        className="form-control"
                                        type={location.type}
                                        id="Osoite"
                                        value={selected.address}
                                        onChange={location.onChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">City</label>
                                    <input
                                        className="form-control"
                                        type={location.type}
                                        id="Kaupunki"
                                        value={location.kaupunki}
                                        onChange={location.onChange}
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
                                        value={location.longitude}
                                        onChange={location.onChange}
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
                                        value={location.latitude}
                                        onChange={location.onChange}
                                    />
                                </div>
                                <button
                                    type="button"
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
