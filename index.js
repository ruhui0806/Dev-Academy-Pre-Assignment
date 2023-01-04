const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { graphqlHTTP } = require('express-graphql')
const schema = require('./server/schema.js')
const dbConnection = require('./server/config/MongoDBconnect')
const path = require('path')
dbConnection()

const port = process.env.PORT || 9000

const app = express()

app.use(cors())

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true,
        // graphiql: process.env.NODE_ENV === 'development',
    })
)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('citybike/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'citybike', 'build', 'index.html'))
    })
}

app.listen(port, console.log(`Server running on port ${port}`))
