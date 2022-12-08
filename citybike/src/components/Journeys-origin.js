import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import Pagination from './Pagination'
import LoadingSpinner from './LoadingSpinner'
import { GET_JOURNEYS, COUNT_JOURNEYS } from '../queries'
const Journeys = () => {
    const [journeysPerPage, setJourneysPerPage] = useState(20)
    const [currentPage, setCurrentPage] = useState(1)
    const journeysResult = useQuery(GET_JOURNEYS, {
        variables: {
            limit: journeysPerPage,
            skip: (currentPage - 1) * journeysPerPage,
        },
    })

    const journeysCount = useQuery(COUNT_JOURNEYS)
    if (journeysResult.loading) return <LoadingSpinner />
    if (journeysResult.error) return <div>Error!</div>
    const lastPage = Math.ceil(
        journeysCount.data.countAlljourneys / journeysPerPage
    )
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    return (
        <div>
            <table className="table table-hover mt-3">
                <thead>
                    <tr>
                        <th>Departure Station</th>
                        <th>Return Station</th>
                        <th>Covered distance (km)</th>
                        <th>Duration (min)</th>
                    </tr>
                </thead>
                <tbody>
                    {journeysResult.data &&
                        journeysResult.data.journeys.map((journey) => (
                            <tr key={journey.id}>
                                <td>{journey.Departure_station_name}</td>
                                <td>{journey.Return_station_name}</td>
                                <td>{journey.Covered_distance_m / 1000}</td>
                                <td>{Math.round(journey.Duration_sec / 60)}</td>
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

export default Journeys
