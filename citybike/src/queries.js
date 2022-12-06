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
const COUNT_JOURNEYS = gql`
    query countAlljourneys {
        countAlljourneys
    }
`

export {
    GET_STATION,
    COUNT_JOURNEY_START_FROM_HERE,
    COUNT_JOURNEY_END_AT_HERE,
    GET_STATIONS,
    COUNT_STATIONS,
    GET_JOURNEYS,
    COUNT_JOURNEYS,
}
