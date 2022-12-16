import { gql } from '@apollo/client'

const ADD_STATION = gql`
    mutation addStation(
        $Name: String!
        $Nimi: String!
        $Namn: String
        $Osoite: String!
        $Adress: String
        $Kaupunki: String!
        $Stad: String
        $Operaattor: String
        $Kapasiteet: Int
        $x: Float!
        $y: Float!
    ) {
        addStation(
            Name: $Name
            Nimi: $Nimi
            Namn: $Namn
            Osoite: $Osoite
            Adress: $Adress
            Kaupunki: $Kaupunki
            Stad: $Stad
            Kapasiteet: $Kapasiteet
            Operaattor: $Operaattor
            x: $x
            y: $y
        ) {
            ID
            Name
            Nimi
            Namn
            Osoite
            Adress
            Kaupunki
            Stad
            Kapasiteet
            Operaattor
            x
            y
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
export { ADD_STATION, DELETE_STATION }
