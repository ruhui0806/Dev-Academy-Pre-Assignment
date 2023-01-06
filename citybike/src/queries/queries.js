import { gql } from '@apollo/client'

const GET_STATION = gql`
    query findStationById($idd: Int!) {
        findStationById(id: $idd) {
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
            id
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
            id
        }
    }
`
const COUNT_STATIONS = gql`
    query countAllstations {
        countAllstations
    }
`
const COUNT_JOURNEY_START_FROM_HERE = gql`
    query countJourneysbyDepartureId($idd: Int!) {
        countJourneysbyDepartureId(departureId: $idd)
    }
`

const COUNT_JOURNEY_END_AT_HERE = gql`
    query countJourneysbyReturnId($idd: Int!) {
        countJourneysbyReturnId(returnId: $idd)
    }
`

const GET_JOURNEYS = gql`
    query getJourneys(
        $limit: Int!
        $skip: Int!
        $durationFilter: Int!
        $distanceFilter: Int!
    ) {
        journeys(
            limit: $limit
            offset: $skip
            durationFilter: $durationFilter
            distanceFilter: $distanceFilter
        ) {
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
    GET_ALL_STATIONS,
    COUNT_STATIONS,
    GET_JOURNEYS,
    COUNT_JOURNEYS,
}
