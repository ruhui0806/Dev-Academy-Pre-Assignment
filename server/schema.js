// const { journeys, stations } = require('../dataset.js')
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLFloat,
} = require('graphql')
const Journey = require('./models/Journey')
const Station = require('./models/Station')

const JourneyType = new GraphQLObjectType({
    name: 'Journey',
    fields: () => ({
        id: { type: GraphQLString },
        Departure: { type: GraphQLFloat },
        Return: { type: GraphQLFloat },
        Departure_station_id: { type: GraphQLInt },
        Departure_station_name: { type: GraphQLString },
        Return_station_id: { type: GraphQLInt },
        Return_station_name: { type: GraphQLString },
        Covered_distance_m: { type: GraphQLInt },
        Duration_sec: {
            type: GraphQLInt,
            resolve(parent, args) {
                return (parent.Return - parent.Departure) / 1000
            },
        },
    }),
})

const StationType = new GraphQLObjectType({
    name: 'Station',
    fields: () => ({
        id: { type: GraphQLID },
        ID: { type: GraphQLInt },
        Nimi: { type: GraphQLString },
        Namn: { type: GraphQLString },
        Name: { type: GraphQLString },
        Osoite: { type: GraphQLString },
        Adress: { type: GraphQLString },
        Kaupunki: { type: GraphQLString },
        Stad: { type: GraphQLString },
        Operaattor: { type: GraphQLString },
        Kapasiteet: { type: GraphQLInt },
        x: { type: GraphQLString },
        y: { type: GraphQLString },
    }),
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        mapApiKey: {
            type: GraphQLString,
            resolve(parent, args) {
                return process.env.REACT_APP_GOOGLE_MAP_API_KEY
            },
        },
        journeys: {
            type: new GraphQLList(JourneyType),
            args: {
                limit: {
                    name: 'limit',
                    type: GraphQLInt,
                },
                offset: {
                    name: 'offset',
                    type: GraphQLInt,
                },
                durationFilter: {
                    name: 'durationFilter',
                    type: GraphQLInt,
                },
                distanceFilter: {
                    name: 'distanceFilter',
                    type: GraphQLInt,
                },
            },
            resolve(parent, args) {
                return Journey.find({
                    Duration_sec: { $gte: 10 },
                    Covered_distance_m: { $gte: 10 },
                })

                    .find({
                        Duration_sec: { $gte: args.durationFilter },
                        Covered_distance_m: { $gte: args.durationFilter },
                    })
                    .limit(args.limit)
                    .skip(args.offset)
            },
        },

        countAlljourneys: {
            type: GraphQLInt,
            resolve(parent, args) {
                return Journey.find({
                    Duration_sec: { $gte: 10 },
                    Covered_distance_m: { $gte: 10 },
                }).count()
            },
        },
        countJourneysbyDepartureId: {
            type: GraphQLInt,
            args: {
                departureId: { type: GraphQLInt },
            },
            resolve(parent, args) {
                return Journey.find({
                    Departure_station_id: args.departureId,
                }).count()
            },
        },
        countJourneysbyReturnId: {
            type: GraphQLInt,
            args: {
                returnId: { type: GraphQLInt },
            },
            resolve(parent, args) {
                return Journey.find({
                    Return_station_id: args.returnId,
                }).count()
            },
        },

        stations: {
            type: new GraphQLList(StationType),
            args: {
                limit: {
                    name: 'limit',
                    type: GraphQLInt,
                },
                offset: {
                    name: 'offset',
                    type: GraphQLInt,
                },
            },
            resolve(parent, args) {
                // return stations
                return Station.find({}).limit(args.limit).skip(args.offset)
            },
        },
        getAllstations: {
            type: new GraphQLList(StationType),
            resolve(parent, args) {
                return Station.find({})
            },
        },
        countAllstations: {
            type: GraphQLInt,
            resolve(parent, args) {
                return Station.find().count()
            },
        },

        findStationById: {
            type: StationType,
            args: { id: { type: GraphQLInt } },
            resolve(parent, args) {
                // return stations.find((station) => station.ID === args.id)
                return Station.findOne({ ID: args.id })
            },
        },
    },
})
//mutations
const allMutations = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        //add a station:
        addStation: {
            type: StationType,
            args: {
                Name: { type: GraphQLNonNull(GraphQLString) },
                Nimi: { type: GraphQLNonNull(GraphQLString) }, //Name === Nimi
                Namn: { type: GraphQLString },
                Osoite: { type: GraphQLNonNull(GraphQLString) },
                Adress: { type: GraphQLString },
                Kaupunki: { type: GraphQLString },
                Stad: { type: GraphQLString },
                Operaattor: { type: GraphQLString },
                Kapasiteet: { type: GraphQLNonNull(GraphQLInt) },
                x: { type: GraphQLNonNull(GraphQLString) },
                y: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                const station = new Station({
                    Name: args.Name,
                    Nimi: args.Nimi,
                    Namn: args.Namn,
                    Osoite: args.Osoite,
                    Adress: args.Adress,
                    Kaupunki: args.Kaupunki,
                    Stad: args.Stad,
                    Operaattor: args.Operaattor,
                    Kapasiteet: args.Kapasiteet,
                    x: args.x,
                    y: args.y,
                })
                return station.save()
            },
        },

        //delete a station:
        deleteStationByGraphQLId: {
            type: StationType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return Station.findByIdAndRemove(args.id)
            },
        },

        //update a station:
        updateStationById: {
            type: StationType,
            args: {
                ID: { type: GraphQLNonNull(GraphQLInt) },
                Name: { type: GraphQLString },
                Nimi: { type: GraphQLString },
                Namn: { type: GraphQLString },
                Osoite: { type: GraphQLString },
                Adress: { type: GraphQLString },
                Kaupunki: { type: GraphQLString },
                Stad: { type: GraphQLString },
                Operaattor: { type: GraphQLString },
                Kapasiteet: { type: GraphQLInt },
            },
            resolve(parent, args) {
                return Station.findOneAndUpdate(
                    { ID: args.ID },
                    {
                        $set: {
                            Name: args.Name,
                            Nimi: args.Nimi,
                            Namn: args.Namn,
                            Osoite: args.Osoite,
                            Adress: args.Adress,
                            Kaupunki: args.Kaupunki,
                            Stad: args.Stad,
                            Operaattor: args.Operaattor,
                            Kapasiteet: args.Kapasiteet,
                        },
                    },
                    { new: true }
                )
            },
        },
    },
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: allMutations,
})
