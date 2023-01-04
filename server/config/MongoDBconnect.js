const schema = require('../schema')
const mongoose = require('mongoose')

mongoose.set('strictQuery', true)
const dbConnection = async () => {
    const connection = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected to: ${connection.connection.host}`)
}
module.exports = dbConnection
