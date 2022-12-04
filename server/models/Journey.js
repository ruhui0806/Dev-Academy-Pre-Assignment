const mongoose = require('mongoose')

const JourneySchema = new mongoose.Schema({
    Departure: {
        type: String,
    },
    Departure_station_id: { type: Number, ref: 'Station' },
    Departure_station_name: { type: String },
    Return: { type: String },
    Return_station_id: { type: Number, ref: 'Station' },
    Return_station_name: { type: String },
    Covered_distance_m: { type: Number },
    Duration_sec: { type: Number },
})

module.exports = mongoose.model('Journey', JourneySchema)
