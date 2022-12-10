import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import LoadingSpinner from './LoadingSpinner'
import {
    GET_STATION,
    COUNT_JOURNEY_START_FROM_HERE,
    COUNT_JOURNEY_END_AT_HERE,
} from '../queries'

const StationView = () => {
    const thisId = parseInt(useParams().id)
    // console.log('ID', thisId)

    const journeyStartCount = useQuery(COUNT_JOURNEY_START_FROM_HERE, {
        variables: {
            idd: thisId,
        },
    })
    // console.log('journey start from this station: ', journeyStartCount.data)

    const journeyEndCount = useQuery(COUNT_JOURNEY_END_AT_HERE, {
        variables: {
            idd: thisId,
        },
    })
    // console.log('journey ends at this station: ', journeyEndCount.data)

    const singleStation = useQuery(GET_STATION, {
        variables: {
            idd: thisId,
        },
    })

    if (journeyStartCount.loading) return <LoadingSpinner />
    if (journeyStartCount.error) return <div>Error!</div>
    if (journeyEndCount.loading) return <LoadingSpinner />
    if (journeyEndCount.error) return <div>Error!</div>
    if (singleStation.loading) return <LoadingSpinner />
    if (singleStation.error) return <div>Error!</div>

    const station = singleStation.data.findStationById
    // console.log('query data: ', singleStation.data.findStationById)

    const countOfJourneyStart =
        journeyStartCount.data.countJourneysbyDepartureId
    console.log('Journey start from here', countOfJourneyStart)

    const countOfJourneyEnd = journeyEndCount.data.countJourneysbyReturnId
    console.log('Journey end at here:', countOfJourneyEnd)

    return (
        <div>
            {!singleStation.loading && !singleStation.error && (
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>ID</th>
                            <th>Address</th>
                            <th>x</th>
                            <th>y</th>
                            <th>Journey start from this station</th>
                            <th>Journey end at this station</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{station.Name}</td>
                            <td>{station.ID}</td>
                            <td>{station.Osoite}</td>
                            <td>{station.x}</td>
                            <td>{station.y}</td>
                            {journeyStartCount.data && (
                                <td>
                                    {
                                        journeyStartCount.data
                                            .countJourneysbyDepartureId
                                    }
                                </td>
                            )}
                            {journeyEndCount.data && (
                                <td>
                                    {
                                        journeyEndCount.data
                                            .countJourneysbyReturnId
                                    }
                                </td>
                            )}
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
