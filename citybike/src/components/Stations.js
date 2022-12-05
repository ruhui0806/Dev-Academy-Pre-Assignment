import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import Pagination from './Pagination'
import StationView from './StationView'
const GET_STATIONS = gql`
    query getStations($limit: Int!, $skip: Int!) {
        stations(limit: $limit, offset: $skip) {
            Adress
            ID
            Name
            Nimi
            Namn
            Osoite
            Kaupunki
            Stad
            Operaattor
            Kapasiteet
            x
            y
            location
        }
    }
`
const COUNT_STATIONS = gql`
    query countAllstations {
        countAllstations
    }
`

export default function Stations() {
    const [stationsPerPage, setStationsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)

    const stationsResult = useQuery(GET_STATIONS, {
        variables: {
            limit: stationsPerPage,
            skip: (currentPage - 1) * stationsPerPage,
        },
    })
    const stationsCount = useQuery(COUNT_STATIONS)
    if (stationsResult.loading) return <div>Loading...</div>
    if (stationsResult.error) return <div>Error!</div>

    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    const lastPage = Math.ceil(
        stationsCount.data.countAllstations / stationsPerPage
    )
    // console.log(
    //     stationsResult.data,
    //     stationsCount.data.countAllstations,
    //     stationsPerPage,
    //     lastPage
    // )

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
                                <td>{station.Name}</td>
                                <td>{station.ID}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <Pagination
                stationsPerPage={stationsPerPage}
                lastPage={lastPage}
                currentPage={currentPage}
                paginate={paginate}
                totalStations={stationsResult.data.countAllstations}
            />
        </div>
    )
}
