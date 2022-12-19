const schema = require('../schema')
const mongoose = require('mongoose')

const dbConnection = async () => {
    const connection = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected to: ${connection.connection.host}`)
}
module.exports = dbConnection
// mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => console.log('Connect to Mongo DB successfully '))
//     .catch((error) => {
//         console.log(
//             'error occurred when connecting to Mongo DB:',
//             error.message
//         )
//     })
