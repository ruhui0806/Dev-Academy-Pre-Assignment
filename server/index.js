const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema')
const dbConnection = require('./config/MongoDBconnect')

dbConnection()

const port = process.env.PORT || 9000

const app = express()

app.use(cors())

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: process.env.NODE_ENV === 'development',
    })
)

app.listen(port, console.log(`Server running on port ${port}`))
