const mongoose = require('mongoose')

const StationSchema = new mongoose.Schema({
    ID: { type: Number },
    Name: { type: String },
    Nimi: { type: String },
    Namn: { type: String },
    Osoite: { type: String },
    Adress: { type: String },
    Kaupunki: { type: String },
    Stad: { type: String },
    Operaattor: { type: String },
    Kapasiteet: { type: Number },
    x: { type: Number },
    y: { type: Number },
})
StationSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.ID = parseInt(
            returnedObject._id.slice(1, 5).valueOf(),
            12
        )
    },
})
module.exports = mongoose.model('Station', StationSchema)
