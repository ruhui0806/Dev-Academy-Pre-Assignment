import React, { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import LoadingSpinner from './LoadingSpinner'
import StationMap from './StationMap'
import { useLoadScript } from '@react-google-maps/api'
import {
    GET_STATION,
    COUNT_JOURNEY_START_FROM_HERE,
    COUNT_JOURNEY_END_AT_HERE,
} from '../queries/queries'

const StationView = () => {
    //get the current station's information:
    const thisId = parseInt(useParams().id)
    const singleStation = useQuery(GET_STATION, {
        variables: {
            idd: thisId,
        },
    })
    const station = singleStation.data.findStationById

    //journey count related queries:
    const journeyStartCount = useQuery(COUNT_JOURNEY_START_FROM_HERE, {
        variables: {
            idd: thisId,
        },
    })
    const journeyEndCount = useQuery(COUNT_JOURNEY_END_AT_HERE, {
        variables: {
            idd: thisId,
        },
    })

    //station view on the map:
    const { mapLoading } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    })

    if (journeyStartCount.loading) return <LoadingSpinner />
    if (journeyStartCount.error) return <div>Error!</div>
    if (journeyEndCount.loading) return <LoadingSpinner />
    if (journeyEndCount.error) return <div>Error!</div>
    if (singleStation.loading) return <LoadingSpinner />
    if (singleStation.error) return <div>Error!</div>
    if (mapLoading) return <LoadingSpinner />

    return (
        <div>
            {!singleStation.loading && !singleStation.error && (
                <div>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>ID</th>
                                <th>Address</th>
                                <th>Journeys start from here</th>
                                <th>Journeys end at here</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{station.Name}</td>
                                <td>{station.ID}</td>
                                <td>{station.Osoite}</td>

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
                </div>
            )}
            {!singleStation.loading && !singleStation.error && !mapLoading && (
                <div className="ratio ratio-16x9 mb-3">
                    <StationMap x={Number(station.x)} y={Number(station.y)} />
                </div>
            )}

            <div className="d-flex mb-3 gap-3">
                <Link to="/stations" className="btn btn-primary ms-auto ">
                    Go Back
                </Link>
            </div>
        </div>
    )
}
export default StationView
