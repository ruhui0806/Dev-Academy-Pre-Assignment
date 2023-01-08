import React, { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import LoadingSpinner from '../LoadingSpinner'
import { FaSort } from 'react-icons/fa'
import Pagination from '../Pagination'
import { GET_ALL_STATIONS, COUNT_STATIONS } from '../../queries/queries'
import StationRow from '../StationRow'

const Stations = () => {
    //pagination related variables
    const [stationsPerPage, setStationsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [indexOfFirstStation, setIndexOfFirstStation] = useState(0)
    const [sortConfig, setSortConfig] = useState({
        attr: 'ID',
        direction: 'ascending',
    })
    const indexOfLastStation = indexOfFirstStation + stationsPerPage
    const [valueToSearch, setValueToSearch] = useState('')

    //query-related:
    const stationsResult = useQuery(GET_ALL_STATIONS, {
        fetchPolicy: 'cache-first',
    })
    const stationsCount = useQuery(COUNT_STATIONS)
    if (stationsResult.loading) return <LoadingSpinner />
    if (stationsResult.error) return <div>Error!</div>

    //pagination related functions:
    const paginate = (pageNumber) => {
        const newOffset = (pageNumber - 1) * stationsPerPage
        setIndexOfFirstStation(newOffset)
        setCurrentPage(pageNumber)
    }
    const lastPage = Math.ceil(
        stationsCount.data.countAllstations / stationsPerPage
    )
    const handlePageClick = (event) => {
        const newOffset = event.selected * stationsPerPage
        console.log(
            `User requested page number ${event.selected}, which is the new offset ${newOffset}`
        )
        setIndexOfFirstStation(newOffset)
        setCurrentPage(event.selected + 1)
    }

    //sort-by-column functions:
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

    //component styles:
    const buttonStyle = {
        marginLeft: 5,
        padding: 0.5,
        paddingBottom: 3.5,
        paddingTop: 2,
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 15,
    }

    return (
        <div>
            <form className="form-inline">
                <h5 className="d-inline p-3">
                    Search Station by Name/Address:
                </h5>
                <input
                    type="text"
                    id="nameToSearch"
                    placeholder="Search for stations"
                    onChange={(e) => setValueToSearch(e.target.value)}
                />
                <div className="d-inline p-3 form-group ml-auto">
                    <label className=" p-3 form-label ml-auto">
                        Stations Per Page:
                    </label>
                    <select
                        id="stationsPerPage"
                        className="w-30 ml-auto"
                        value={stationsPerPage}
                        form-select-border-width="1"
                        onChange={(e) =>
                            setStationsPerPage(parseInt(e.target.value))
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
                            ID
                            <button
                                style={buttonStyle}
                                className="btn btn-light btn-sm"
                                onClick={() => requestSort('ID')}
                                id="btn-sort-id"
                            >
                                {' '}
                                <FaSort />
                            </button>
                        </th>
                        <th>
                            Name
                            <button
                                onClick={() => requestSort('Name')}
                                style={buttonStyle}
                                className="btn btn-light btn-sm"
                                id="btn-sort-name"
                            >
                                {' '}
                                <FaSort />
                            </button>
                        </th>
                        <th>
                            Address
                            <button
                                onClick={() => requestSort('Osoite')}
                                style={buttonStyle}
                                className="btn btn-light btn-sm"
                                id="btn-sort-address"
                            >
                                {' '}
                                <FaSort />
                            </button>
                        </th>
                        <th>
                            Capacity
                            <button
                                onClick={() => requestSort('Kapasiteet')}
                                style={buttonStyle}
                                className="btn btn-light btn-sm"
                                id="btn-sort-capacity"
                            >
                                {' '}
                                <FaSort />
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {stationsResult.data &&
                        [...stationsResult.data.stations]
                            .filter(
                                (station) =>
                                    station.Name.includes(valueToSearch) ||
                                    station.Osoite.includes(valueToSearch)
                            )
                            .sort(SortByColumn)
                            .slice(indexOfFirstStation, indexOfLastStation)
                            .map((station) => (
                                <StationRow
                                    station={station}
                                    key={station.ID}
                                />
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

export default Stations
