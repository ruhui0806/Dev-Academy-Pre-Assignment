import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import Pagination from './Pagination'
import PaginationButtons from './PaginationButtons'
import LoadingSpinner from './LoadingSpinner'
import { Link } from 'react-router-dom'
import { GET_STATIONS, COUNT_STATIONS } from '../queries'

const Stations = () => {
    const [stationsPerPage, setStationsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)

    const stationsResult = useQuery(GET_STATIONS, {
        variables: {
            limit: stationsPerPage,
            skip: (currentPage - 1) * stationsPerPage,
        },
    })
    const stationsCount = useQuery(COUNT_STATIONS)
    if (stationsResult.loading) return <LoadingSpinner />
    if (stationsResult.error) return <div>Error!</div>

    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    const lastPage = Math.ceil(
        stationsCount.data.countAllstations / stationsPerPage
    )
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
                        stationsResult.data.stations.map((station) => (
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
            <Pagination
                lastPage={lastPage}
                currentPage={currentPage}
                paginate={paginate}
            />
        </div>
    )
}

export default Stations
