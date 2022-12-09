import { gql } from '@apollo/client'

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
const COUNT_JOURNEY_START_FROM_HERE = gql`
    query countSjourneyByDepartureId($idd: Int!) {
        countJourneysbyDepartureId(departureId: $idd)
    }
`
const COUNT_JOURNEY_END_AT_HERE = gql`
    query countJourneysbyReturnId($idd: Int!) {
        countJourneysbyReturnId(returnId: $idd)
    }
`

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
const GET_ALL_STATIONS = gql`
    query getAllstations {
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
const COUNT_STATIONS = gql`
    query countAllstations {
        countAllstations
    }
`

const GET_JOURNEYS = gql`
    query getJourneys($limit: Int!, $skip: Int!) {
        journeys(limit: $limit, offset: $skip) {
            Departure
            Return
            Departure_station_id
            Departure_station_name
            Return_station_id
            Return_station_name
            Covered_distance_m
            Duration_sec
            id
        }
    }
`
const GET_ALL_JOURNEYS = gql`
    query getAlljourneys {
        journeys {
            Departure
            Return
            Departure_station_id
            Departure_station_name
            Return_station_id
            Return_station_name
            Covered_distance_m
            Duration_sec
            id
        }
    }
`
const COUNT_JOURNEYS = gql`
    query countAlljourneys {
        countAlljourneys
    }
`
// const FIND_STATION_BY_NAME = gql`
//     query findStationByName($nameToSearch: String!) {
//         findStationByName(name: $nameToSearch) {
//             Name
//             ID
//             Osoite
//             x
//             y
//             Kapasiteet
//         }
//     }
// `

export {
    GET_STATION,
    COUNT_JOURNEY_START_FROM_HERE,
    COUNT_JOURNEY_END_AT_HERE,
    GET_STATIONS,
    GET_ALL_STATIONS,
    COUNT_STATIONS,
    GET_JOURNEYS,
    GET_ALL_JOURNEYS,
    COUNT_JOURNEYS,
    // FIND_STATION_BY_NAME,
}
