import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import Pagination from './Pagination'

import LoadingSpinner from './LoadingSpinner'
import { GET_ALL_JOURNEYS, COUNT_JOURNEYS, GET_JOURNEYS } from '../queries'
import { FaSort } from 'react-icons/fa'

const Journeys = () => {
    // const indexOfLastItem = indexOfFirstItem + journeysPerPage
    // const journeysResult = useQuery(GET_ALL_JOURNEYS, {
    //     fetchPolicy: 'cache-first',
    // })
    // const [indexOfFirstItem, setIndexOfFirstItem] = useState(0)
    const [journeysPerPage, setJourneysPerPage] = useState(20)
    const [currentPage, setCurrentPage] = useState(1)
    const [sortConfig, setSortConfig] = useState({
        attr: 'Duration_sec',
        direction: 'ascending',
    })
    const [valueToSearch, setValueToSearch] = useState('')

    const journeysCount = useQuery(COUNT_JOURNEYS)
    const journeysResult = useQuery(GET_JOURNEYS, {
        variables: {
            limit: journeysPerPage,
            skip: (currentPage - 1) * journeysPerPage,
        },
        fetchPolicy: 'cache-first',
    })

    console.log(journeysResult.data)
    console.log('count the total number of journeys: ', journeysCount.data)

    if (journeysResult.loading) return <LoadingSpinner />
    if (journeysResult.error) return <div>Error!</div>
    if (journeysCount.loading) return <LoadingSpinner />
    if (journeysCount.error) return <div>Error!</div>

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    // const lastPage = Math.ceil(1747696 / journeysPerPage)
    const lastPage = Math.ceil(
        parseInt(journeysCount.data.countAlljourneys) / journeysPerPage
    )

    console.log('last page in Journey list: ', lastPage)

    const handlePageClick = (event) => {
        console.log(event.selected)
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

    ////
    return (
        <div>
            <form className="form-inline">
                <h5 className="d-inline p-3">
                    Search Journey by depature/return station
                </h5>
                <input
                    type="text"
                    id="nameToSearch"
                    placeholder="Search for stations"
                    onChange={(e) => setValueToSearch(e.target.value)}
                />
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
                            <span
                                onClick={() =>
                                    requestSort('Departure_station_name')
                                }
                            >
                                {' '}
                                <FaSort />
                            </span>
                        </th>

                        <th>
                            Return Station
                            <span
                                onClick={() =>
                                    requestSort('Return_station_name')
                                }
                            >
                                {' '}
                                <FaSort />
                            </span>
                        </th>
                        <th>
                            Covered distance (km)
                            <span
                                onClick={() =>
                                    requestSort('Covered_distance_m')
                                }
                            >
                                {' '}
                                <FaSort />
                            </span>
                        </th>
                        {/* <th>Duration (min)</th> */}
                        <th>
                            Duration (min)
                            <span onClick={() => requestSort('Duration_sec')}>
                                {' '}
                                <FaSort />
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {journeysResult.data &&
                        [...journeysResult.data.journeys]
                            .filter(
                                (journey) =>
                                    journey.Departure_station_name.includes(
                                        valueToSearch
                                    ) ||
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

            {/* <ReactPaginate
                className="pagination justify-content-center"
                nextLabel="next >"
                onPageChange={handlePageClick}
                forcePage={currentPage - 1}
                onPageActive={() => paginate(currentPage - 1)}
                pageRangeDisplayed={9}
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
                activeLinkClassName="page-link"
                renderOnZeroPageCount={null}
            /> */}
        </div>
    )
}

export default Journeys
