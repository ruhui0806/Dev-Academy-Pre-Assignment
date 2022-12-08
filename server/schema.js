// const { journeys, stations } = require('../dataset.js')
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
} = require('graphql')
const Journey = require('./models/Journey')
const Station = require('./models/Station')

const JourneyType = new GraphQLObjectType({
    name: 'Journey',
    fields: () => ({
        id: { type: GraphQLString },
        Departure: { type: GraphQLString },
        Return: { type: GraphQLString },
        Departure_station_id: { type: GraphQLInt },
        Departure_station_name: { type: GraphQLString },
        Return_station_id: { type: GraphQLInt },
        Return_station_name: { type: GraphQLString },
        Covered_distance_m: { type: GraphQLInt },
        Duration_sec: { type: GraphQLInt },
    }),
})

const StationType = new GraphQLObjectType({
    name: 'Station',
    fields: () => ({
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
        location: {
            type: GraphQLString,
            resolve(parent, args) {
                return 'x: ' + parent.x + '; y: ' + parent.y
            },
        },
    }),
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
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
            },
            resolve(parent, args) {
                return Journey.find().limit(args.limit).skip(args.offset)
            },
        },
        getAlljourneys: {
            type: new GraphQLList(JourneyType),
            resolve(parent, args) {
                return Journey.find()
            },
        },
        countAlljourneys: {
            type: GraphQLInt,
            resolve(parent, args) {
                return Journey.find().count()
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

        findJourneyByDepature: {
            type: new GraphQLList(JourneyType),
            args: { departure: { type: GraphQLString } },
            resolve(parent, args) {
                // return journeys.find(
                //     (j) => j.Departure_station_name === args.departure
                // )
                return Journey.find({
                    Departure_station_name: args.departure,
                })
            },
        },
        findJourneyByReturn: {
            type: new GraphQLList(JourneyType),
            args: { return: { type: GraphQLString } },
            resolve(parent, args) {
                // return journeys.find(
                //     (j) => j.Return_station_name === args.return
                // )
                return Journey.find({ Return_station_name: args.return })
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

        findStationByCity: {
            type: new GraphQLList(StationType),
            args: { city: { type: GraphQLString } },
            resolve(parent, args) {
                return Station.find({ Kaupunki: args.city })
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
        findStationByName: {
            type: StationType,
            args: { name: { type: GraphQLString } },
            resolve(parent, args) {
                // return stations.find((station) => station.Name === args.name)
                return Station.findOne({ Name: args.name })
            },
        },
    },
})
//mutations
const allMutations = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        //add a journey:
        addJourney: {
            type: JourneyType,
            args: {
                Departure: { type: GraphQLNonNull(GraphQLString) },
                Departure_station_name: { type: GraphQLNonNull(GraphQLString) },
                Departure_station_id: { type: GraphQLNonNull(GraphQLInt) },
                Return: { type: GraphQLNonNull(GraphQLString) },
                Return_station_name: { type: GraphQLNonNull(GraphQLString) },
                Return_station_id: { type: GraphQLNonNull(GraphQLInt) },
                Covered_distance_m: { type: GraphQLNonNull(GraphQLInt) },
                Duration_sec: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve(parent, args) {
                const journey = new Journey({
                    Departure: args.Departure,
                    Departure_station_name: args.Departure_station_name,
                    Departure_station_id: args.Departure_station_id,
                    Return: args.Return,
                    Return_station_name: args.Return_station_name,
                    Return_station_id: args.Return_station_id,
                    Covered_distance_m: args.Covered_distance_m,
                    Duration_sec: args.Duration_sec,
                })
                return Journey.save()
                // Client.create()
            },
        },
        //delete a journey:
        deleteJourney: {
            type: JourneyType,
            args: {
                ID: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return Journey.findOneAndRemove({ ID: args.ID })
            },
        },

        //add a station:
        addStation: {
            type: StationType,
            args: {
                Adress: { type: GraphQLNonNull(GraphQLString) },
                ID: { type: GraphQLNonNull(GraphQLID) },
                Name: { type: GraphQLNonNull(GraphQLString) },
                Nimi: { type: GraphQLNonNull(GraphQLString) },
                Namn: { type: GraphQLNonNull(GraphQLString) },
                Osoite: { type: GraphQLNonNull(GraphQLString) },
                Kaupunki: { type: GraphQLNonNull(GraphQLString) },
                Stad: { type: GraphQLNonNull(GraphQLString) },
                Operaattor: { type: GraphQLNonNull(GraphQLString) },
                Kapasiteet: { type: GraphQLNonNull(GraphQLInt) },
                x: { type: GraphQLNonNull(GraphQLString) },
                y: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                const station = new Station({
                    Adress,
                    ID,
                    Name,
                    Nimi,
                    Namn,
                    Osoite,
                    Kaupunki,
                    Stad,
                    Operaattor,
                    Kapasiteet,
                    x,
                    y,
                })
                return Station.save()
            },
        },

        //delete a station:
        deleteStation: {
            type: StationType,
            args: {
                ID: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return Project.findOneAndRemove({ ID: args.ID })
            },
        },
    },
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: allMutations,
})

//schema based on graphql-schema
