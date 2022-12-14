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
    })
)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    })
}

app.listen(port, console.log(`Server running on port ${port}`))
