import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import Pagination from '../Pagination'

import LoadingSpinner from '../LoadingSpinner'
import { COUNT_JOURNEYS, GET_JOURNEYS } from '../../queries/queries'
import { FaSort } from 'react-icons/fa'
import { MdFilterAlt } from 'react-icons/md'
const Journeys = () => {
    const [journeysPerPage, setJourneysPerPage] = useState(20)
    const [currentPage, setCurrentPage] = useState(1)
    const [sortConfig, setSortConfig] = useState({
        attr: 'Duration_sec',
        direction: 'ascending',
    })
    const [valueToSearch, setValueToSearch] = useState('')
    const [durationToFilter, setDurationToFilter] = useState(0)
    const [valuetoFilter, setValueToFilter] = useState(0)
    const onClickFilter = () => {
        setDurationToFilter(Number(valuetoFilter * 60))
    }

    const journeysCount = useQuery(COUNT_JOURNEYS)
    const journeysResult = useQuery(GET_JOURNEYS, {
        variables: {
            limit: journeysPerPage,
            skip: (currentPage - 1) * journeysPerPage,
            durationFilter: durationToFilter,
            distanceFilter: 0,
        },
        fetchPolicy: 'cache-first',
    })

    if (journeysResult.loading) return <LoadingSpinner />
    if (journeysResult.error) return <div>Error!</div>
    if (journeysCount.loading) return <LoadingSpinner />
    if (journeysCount.error) return <div>Error!</div>

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const lastPage = Math.ceil(
        parseInt(journeysCount.data.countAlljourneys) / journeysPerPage
    )

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1)
    }

    const SortByColumn = (a, b) => {
        if (a[sortConfig.attr] < b[sortConfig.attr]) {
            return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.attr] > b[sortConfig.attr]) {
            return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
    }

    const requestSort = (attr) => {
        let direction = 'ascending'
        if (sortConfig.attr === attr && sortConfig.direction === 'ascending') {
            direction = 'descending'
        }
        setSortConfig({ attr, direction })
    }
    const buttonStyle = {
        marginLeft: 5,
        padding: 0.5,
        paddingBottom: 3.5,
        paddingTop: 2,
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 15,
    }
    ////
    return (
        <div>
            <form className="form-inline">
                <p className="d-inline p-3">
                    Search Journey by depature/return station
                </p>
                <input
                    type="text"
                    id="nameToSearch"
                    placeholder="Search for stations"
                    onChange={(e) => setValueToSearch(e.target.value)}
                />
                <br />
                <p className="d-inline p-3">
                    Filter Journeys by Duration (min)
                </p>
                <input
                    type="number"
                    id="durationToFilter"
                    value={valuetoFilter}
                    onChange={(e) => setValueToFilter(e.target.value)}
                />
                <button
                    className="d-inline btn btn-light btn-sm"
                    onClick={onClickFilter}
                    style={buttonStyle}
                >
                    <MdFilterAlt />
                </button>

                <div className="d-inline p-3 form-group ml-auto">
                    <label className=" p-3 form-label ml-auto">
                        Journeys Per Page:
                    </label>
                    <select
                        id="journeysPerPage"
                        className="w-30 ml-auto"
                        value={journeysPerPage}
                        form-select-border-width="1"
                        onChange={(e) =>
                            setJourneysPerPage(parseInt(e.target.value))
                        }
                    >
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
            </form>
            <table className="table table-hover mt-3">
                <thead>
                    <tr>
                        <th>
                            Departure Station
                            <button
                                style={buttonStyle}
                                className="btn btn-light btn-sm"
                                onClick={() =>
                                    requestSort('Departure_station_name')
                                }
                            >
                                {' '}
                                <FaSort />
                            </button>
                        </th>

                        <th>
                            Return Station
                            <button
                                style={buttonStyle}
                                className="btn btn-light btn-sm"
                                onClick={() =>
                                    requestSort('Return_station_name')
                                }
                            >
                                {' '}
                                <FaSort />
                            </button>
                        </th>
                        <th>
                            Covered distance (km)
                            <button
                                style={buttonStyle}
                                className="btn btn-light btn-sm"
                                onClick={() =>
                                    requestSort('Covered_distance_m')
                                }
                            >
                                {' '}
                                <FaSort />
                            </button>
                        </th>

                        <th>
                            Duration (min)
                            <button
                                style={buttonStyle}
                                className="btn btn-light btn-sm"
                                onClick={() => requestSort('Duration_sec')}
                            >
                                {' '}
                                <FaSort />
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {journeysResult.data &&
                        [...journeysResult.data.journeys]
                            .filter(
                                (journey) =>
                                    (journey.Duration_sec >= durationToFilter &&
                                        journey.Departure_station_name.includes(
                                            valueToSearch
                                        )) ||
                                    journey.Return_station_name.includes(
                                        valueToSearch
                                    )
                            )
                            .sort(SortByColumn)
                            .map((journey) => (
                                <tr key={journey.id}>
                                    <td>{journey.Departure_station_name}</td>
                                    <td>{journey.Return_station_name}</td>
                                    <td>{journey.Covered_distance_m / 1000}</td>
                                    <td>
                                        {Math.round(journey.Duration_sec / 60)}
                                    </td>
                                </tr>
                            ))}
                </tbody>
            </table>
            <Pagination
                lastPage={lastPage}
                currentPage={currentPage}
                paginate={paginate}
                handlePageClick={handlePageClick}
            />
        </div>
    )
}

export default Journeys
