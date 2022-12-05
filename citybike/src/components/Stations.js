import React from 'react'
import { gql, useQuery } from '@apollo/client'
import StationView from './StationView'
const GET_STATIONS = gql`
    query getStations {
        stations {
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

export default function Stations() {
    const { loading, error, data } = useQuery(GET_STATIONS)
    if (loading) return <div>Loading...</div>
    if (error) return <div>Error!</div>
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>ID</th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.stations.map((station) => (
                            <tr key={station.ID}>
                                <td>{station.Name}</td>
                                <td>{station.ID}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}
