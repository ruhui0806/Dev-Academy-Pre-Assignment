import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import ReactPaginate from 'react-paginate'
import LoadingSpinner from './LoadingSpinner'
import { Link } from 'react-router-dom'
import { FaArrowsAltV } from 'react-icons/fa'
import { GET_ALL_STATIONS, COUNT_STATIONS } from '../queries'

const Stations = () => {
    // const indexOfLastStation = currentPage * stationsPerPage
    // const indexOfFirstStation = indexOfLastStation - stationsPerPage

    const [stationsPerPage, setStationsPerPage] = useState(20)
    const [currentPage, setCurrentPage] = useState(1)
    const [indexOfFirstStation, setIndexOfFirstStation] = useState(0)
    const [sortConfig, setSortConfig] = useState({
        attr: 'ID',
        direction: 'ascending',
    })

    const indexOfLastStation = indexOfFirstStation + stationsPerPage

    const stationsResult = useQuery(GET_ALL_STATIONS, {
        fetchPolicy: 'cache-first',
    })
    console.log('stationsResult.data: ', stationsResult.data) //{stations: Array(457)}

    const stationsCount = useQuery(COUNT_STATIONS)
    if (stationsResult.loading) return <LoadingSpinner />
    if (stationsResult.error) return <div>Error!</div>

    const paginate = (pageNumber) => setCurrentPage(pageNumber)
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
            <table className="table table-hover mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>
                            ID
                            <span onClick={() => requestSort('ID')}>
                                {' '}
                                <FaArrowsAltV />
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {stationsResult.data &&
                        [...stationsResult.data.stations]
                            .sort(SortByColumn)
                            .slice(indexOfFirstStation, indexOfLastStation)
                            .map((station) => (
                                <tr key={station.ID}>
                                    <td>
                                        <Link
                                            to={`/stations/${station.ID}`}
                                            className="page-link "
                                        >
                                            {station.Name}
                                        </Link>
                                    </td>
                                    <td>{station.ID}</td>
                                </tr>
                            ))}
                </tbody>
            </table>
            {/* <Pagination
                lastPage={lastPage}
                currentPage={currentPage}
                paginate={paginate}
            />
            <PaginationV2
                lastPage={lastPage}
                currentPage={currentPage}
                paginate={paginate}
            /> */}

            <ReactPaginate
                className="pagination justify-content-center"
                nextLabel="next >"
                onPageChange={handlePageClick}
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
