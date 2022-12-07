import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import ReactPaginate from 'react-paginate'
import LoadingSpinner from './LoadingSpinner'
import { Link } from 'react-router-dom'
import { GET_ALL_STATIONS, COUNT_STATIONS } from '../queries'

const Stations = () => {
    const [stationsPerPage, setStationsPerPage] = useState(20)
    const [currentPage, setCurrentPage] = useState(1)
    const [indexOfFirstStation, setIndexOfFirstStation] = useState(0)

    // const indexOfLastStation = currentPage * stationsPerPage
    // const indexOfFirstStation = indexOfLastStation - stationsPerPage

    const indexOfLastStation = indexOfFirstStation + stationsPerPage

    const stationsResult = useQuery(GET_ALL_STATIONS)
    console.log(stationsResult.data)

    const stationsCount = useQuery(COUNT_STATIONS)
    if (stationsResult.loading) return <LoadingSpinner />
    if (stationsResult.error) return <div>Error!</div>

    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    const lastPage = Math.ceil(
        stationsCount.data.countAllstations / stationsPerPage
    )
    const handlePageClick = (event) => {
        const newOffset =
            (event.selected * stationsPerPage) %
            stationsCount.data.countAllstations
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        )
        setIndexOfFirstStation(newOffset)
        setCurrentPage(event.selected + 1)
    }
    return (
        <div>
            <table className="table table-hover mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>ID</th>
                    </tr>
                </thead>
                <tbody>
                    {stationsResult.data &&
                        stationsResult.data.stations
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

export default Stations
