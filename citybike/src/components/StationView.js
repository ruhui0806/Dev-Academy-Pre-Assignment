import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import LoadingSpinner from './LoadingSpinner'

//queries:
const GET_STATION = gql`
    query findStationById($idd: Int!) {
        findStationById(id: $idd) {
            Name
            Osoite
            Kaupunki
            ID
            Operaattor
        }
    }
`

const StationView = () => {
    const thisId = parseInt(useParams().id)
    // console.log('ID', thisId)

    const singleStation = useQuery(GET_STATION, {
        variables: {
            idd: thisId,
        },
    })
    if (singleStation.loading) return <LoadingSpinner />
    if (singleStation.error) return <div>Error!</div>

    const station = singleStation.data.findStationById
    // console.log('query data: ', singleStation.data.findStationById)

    return (
        <div>
            {!singleStation.loading && !singleStation.error && (
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>ID</th>
                            <th>Address</th>
                            <th>Journey start from this station</th>
                            <th>Journey end at this station</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{station.Name}</td>
                            <td>{station.ID}</td>
                            <td>{station.Osoite}</td>
                            <td>{station.Kaupunki}</td>
                            <td>{station.Operaattor}</td>
                        </tr>
                    </tbody>
                </table>
            )}
            <Link to="/stations" className="btn btn-primary">
                Go Back
            </Link>
        </div>
    )
}
export default StationView
