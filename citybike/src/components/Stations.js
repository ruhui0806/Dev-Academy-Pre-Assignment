import React from 'react'
import { gql, useQuery } from '@apollo/client'
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
            {data && data.stations.map((station) => <p>{station.Name}</p>)}
        </div>
    )
}
