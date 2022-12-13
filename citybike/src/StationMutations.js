import gql from '@apollo/client'

const ADD_STATION = gql`
    mutation addStation(
        $ID: Int!
        $Name: String!
        $Namn: String!
        $Osoite: String!
        $Adress: String!
        $Kaupunki: EnumKaupunki!
        Kapasiteet: Int
        $x: Float
        $y: Float
    ) {
        addStation(
            ID: $ID
            Name: $Name
            Nimi: $Name
            Namn: $Namn
            Osoite: $Osoite
            Adress: $Adress
            Kaupunki: $Kaupunki
            Kapasiteet: $Kapasiteet
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
            Kapasiteet
            x
            y
        }
    }
`
export { ADD_STATION }
