import React from 'react'
import { FaBicycle } from 'react-icons/fa'
const AddStationModal = () => {
    return (
        <div>
            <button
                type="button"
                className="btn btn-secondary"
                data-bs-toggle="modal"
                data-bs-target="#addStationModal"
            >
                <div className="d-flex align-items-center">
                    <FaBicycle className="icon" />
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
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="Name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="Name"
                                    />
                                </div>
                            </form>
                        </div>
                        {/* <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-primary">
                                Save changes
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddStationModal
