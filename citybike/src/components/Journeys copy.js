import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import Pagination from './Pagination'
import ReactPaginate from 'react-paginate'
import LoadingSpinner from './LoadingSpinner'
import { GET_ALL_JOURNEYS, COUNT_JOURNEYS, GET_JOURNEYS } from '../queries'
import { FaArrowsAltV } from 'react-icons/fa'
const Journeys = () => {
    const [journeysPerPage, setJourneysPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [indexOfFirstItem, setIndexOfFirstItem] = useState(0)
    const [sortConfig, setSortConfig] = useState({
        attr: 'Duration_sec',
        direction: 'ascending',
    })

    const indexOfLastItem = indexOfFirstItem + journeysPerPage

    const journeysResult = useQuery(GET_ALL_JOURNEYS, {
        fetchPolicy: 'cache-first',
    })
    // const journeysResult = useQuery(GET_JOURNEYS, {
    //     variables: {
    //         limit: journeysPerPage,
    //         skip: (currentPage - 1) * journeysPerPage,
    //     },
    // })

    console.log(journeysResult.data)

    const journeysCount = useQuery(COUNT_JOURNEYS)
    if (journeysResult.loading) return <LoadingSpinner />
    if (journeysResult.error) return <div>Error!</div>

    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    const lastPage = Math.ceil(
        journeysCount.data.countAlljourneys / journeysPerPage
    )

    const handlePageClick = (event) => {
        const newOffset =
            (event.selected * journeysPerPage) %
            journeysCount.data.countAlljourneys
        console.log(
            `User requested page number ${event.selected}, which is the new offset ${newOffset}`
        )
        setIndexOfFirstItem(newOffset)
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
                                <FaArrowsAltV />
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
                                <FaArrowsAltV />
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
                                <FaArrowsAltV />
                            </span>
                        </th>
                        {/* <th>Duration (min)</th> */}
                        <th>
                            Duration (min)
                            <span onClick={() => requestSort('Duration_sec')}>
                                {' '}
                                <FaArrowsAltV />
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {journeysResult.data &&
                        [...journeysResult.data.journeys]
                            .sort(SortByColumn)
                            .slice(indexOfFirstItem, indexOfLastItem)
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
            {/* <Pagination
                lastPage={lastPage}
                currentPage={currentPage}
                paginate={paginate}
            /> */}
            <ReactPaginate
                className="pagination justify-content-center"
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
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

export default Journeys
