import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import ReactPaginate from 'react-paginate'
import LoadingSpinner from './LoadingSpinner'
import { Link } from 'react-router-dom'
import { FaSort } from 'react-icons/fa'
import Pagination from './Pagination'
import { GET_ALL_STATIONS, COUNT_STATIONS } from '../queries'

const Stations = () => {
    // const indexOfLastStation = currentPage * stationsPerPage
    // const indexOfFirstStation = indexOfLastStation - stationsPerPage

    const [stationsPerPage, setStationsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [indexOfFirstStation, setIndexOfFirstStation] = useState(0)
    const [sortConfig, setSortConfig] = useState({
        attr: 'ID',
        direction: 'ascending',
    })

    const indexOfLastStation = indexOfFirstStation + stationsPerPage

    const [valueToSearch, setValueToSearch] = useState('')
    const stationsResult = useQuery(GET_ALL_STATIONS, {
        fetchPolicy: 'cache-first',
    })
    // console.log('stationsResult.data: ', stationsResult.data) //{stations: Array(457)}

    const stationsCount = useQuery(COUNT_STATIONS)
    if (stationsResult.loading) return <LoadingSpinner />
    if (stationsResult.error) return <div>Error!</div>

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

    return (
        <div>
            {/* <div className="d-flex align-items-center d-inline"> */}
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
            {/* </div> */}
            <table className="table table-hover mt-3">
                <thead>
                    <tr>
                        <th>
                            ID
                            <span onClick={() => requestSort('ID')}>
                                {' '}
                                <FaSort />
                            </span>
                        </th>
                        <th>
                            Name
                            <span onClick={() => requestSort('Name')}>
                                {' '}
                                <FaSort />
                            </span>
                        </th>
                        <th>
                            Address
                            <span onClick={() => requestSort('Osoite')}>
                                {' '}
                                <FaSort />
                            </span>
                        </th>
                        <th>
                            Capacity
                            <span onClick={() => requestSort('Kapasiteet')}>
                                {' '}
                                <FaSort />
                            </span>
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
                                <tr key={station.ID}>
                                    <td>{station.ID}</td>
                                    <td>
                                        <Link
                                            to={`/stations/${station.ID}`}
                                            className="page-link "
                                        >
                                            {station.Name}
                                        </Link>
                                    </td>
                                    <td>{station.Osoite}</td>
                                    <td>{station.Kapasiteet}</td>
                                </tr>
                            ))}
                </tbody>
            </table>
            <Pagination
                lastPage={lastPage}
                currentPage={currentPage}
                paginate={paginate}
            />

            <ReactPaginate
                className="pagination justify-content-center"
                nextLabel="next >"
                onPageChange={handlePageClick}
                forcePage={currentPage - 1}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                pageCount={lastPage}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />
        </div>
    )
}

export default Stations
