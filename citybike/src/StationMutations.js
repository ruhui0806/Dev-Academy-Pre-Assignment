import gql from '@apollo/client'

const ADD_STATION = gql`
    mutation addStation(
        $ID: Int!
        $Name: String!
        $Nimi:String!
        $Namn: String
        $Osoite: String!
        $Adress: String!
        $Kaupunki: String!
        $Stad:String!
        Kapasiteet: Int
        Operaattor: String
        $x: Float!
        $y: Float!
    ) {
        addStation(
            ID: $ID
            Name: $Name
            Nimi: $Name
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
export { ADD_STATION }
