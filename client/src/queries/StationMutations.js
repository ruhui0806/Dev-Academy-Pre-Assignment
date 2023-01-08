import { gql } from '@apollo/client'

const ADD_STATION = gql`
    mutation addStation(
        $name: String!
        $nimi: String!
        $namn: String!
        $osoite: String!
        $adress: String!
        $kaupunki: String!
        $stad: String!
        $operaattor: String!
        $kapasiteet: Int!
        $longitude: String!
        $latitude: String!
    ) {
        addStation(
            Name: $name
            Nimi: $nimi
            Namn: $namn
            Osoite: $osoite
            Adress: $adress
            Kaupunki: $kaupunki
            Stad: $stad
            Operaattor: $operaattor
            Kapasiteet: $kapasiteet
            x: $longitude
            y: $latitude
        ) {
            Name
            Nimi
            Namn
            Osoite
            Adress
            Kaupunki
            Stad
            Operaattor
            Kapasiteet
            x
            y
            ID
            id
        }
    }
`
const DELETE_STATION = gql`
    mutation deleteStationByGraphQLId($idd: ID!) {
        deleteStationByGraphQLId(id: $idd) {
            ID
            Name
        }
    }
`

const UPDATE_STATION = gql`
    mutation updateStationById(
        $ID: Int!
        $name: String!
        $nimi: String!
        $namn: String!
        $osoite: String!
        $adress: String!
        $kaupunki: String!
        $stad: String!
        $operaattor: String!
        $kapasiteet: Int!
    ) {
        updateStationById(
            ID: $ID
            Name: $name
            Nimi: $nimi
            Namn: $namn
            Osoite: $osoite
            Adress: $adress
            Kaupunki: $kaupunki
            Stad: $stad
            Operaattor: $operaattor
            Kapasiteet: $kapasiteet
        ) {
            Name
            Nimi
            Namn
            Osoite
            Adress
            Kaupunki
            Stad
            Operaattor
            Kapasiteet
            x
            y
            ID
            id
        }
    }
`
export { ADD_STATION, DELETE_STATION, UPDATE_STATION }
