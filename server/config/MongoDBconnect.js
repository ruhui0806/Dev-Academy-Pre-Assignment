const schema = require('../schema')
const mongoose = require('mongoose')

const dbConnection = async () => {
    const connection = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected to: ${connection.connection.host}`)
}
module.exports = dbConnection
