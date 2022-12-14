import React, { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import LoadingSpinner from '../LoadingSpinner'
import StationMap from '../StationMap'
import UpdateStationModal from '../UpdateStationModal'
import { GET_MAP_API_KEY } from '../../queries/queries.js'
import { useLoadScript } from '@react-google-maps/api'
import {
    GET_STATION,
    COUNT_JOURNEY_START_FROM_HERE,
    COUNT_JOURNEY_END_AT_HERE,
} from '../../queries/queries'

const StationView = () => {
    //get the current station's information:
    const thisId = parseInt(useParams().id)
    // console.log(thisId)
    const singleStation = useQuery(GET_STATION, {
        variables: {
            idd: thisId,
        },
    })

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
    const mapAPIresult = useQuery(GET_MAP_API_KEY)
    let mapAPIkey
    //station view on the map:
    mapAPIkey =
        !mapAPIresult.loading &&
        !mapAPIresult.error &&
        mapAPIresult.data.mapApiKey
    const { mapLoading } = useLoadScript({
        googleMapsApiKey: mapAPIkey,
    })
    if (mapAPIresult.error) return <p>Something Went Wrong</p>
    if (mapAPIresult.loading) return <LoadingSpinner />

    if (journeyStartCount.loading) return <LoadingSpinner />
    if (journeyStartCount.error) return <div>Error!</div>
    if (journeyEndCount.loading) return <LoadingSpinner />
    if (journeyEndCount.error) return <div>Error!</div>
    if (singleStation.loading) return <LoadingSpinner />
    if (singleStation.error) return <div>Error!</div>
    if (mapLoading) return <LoadingSpinner />

    const station = singleStation.data.findStationById
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
                                <th>City</th>
                                <th>Journeys start from here</th>
                                <th>Journeys end at here</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{station.Name}</td>
                                <td>{station.ID}</td>
                                <td>{station.Osoite}</td>
                                <td>{station.Kaupunki}</td>

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
                    <div className="d-flex mb-3 gap-3">
                        <UpdateStationModal station={station} />
                        <Link
                            to="/stations"
                            className="btn btn-primary ms-auto "
                        >
                            Go Back
                        </Link>
                    </div>
                </div>
            )}
            {!singleStation.loading && !singleStation.error && !mapLoading && (
                <div className="ratio ratio-16x9 mb-3">
                    <StationMap x={Number(station.x)} y={Number(station.y)} />
                </div>
            )}
        </div>
    )
}
export default StationView
