import React from 'react'
import Header from './Header'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import {
    ApolloProvider,
    ApolloClient,
    InMemoryCache,
    HttpLink,
} from '@apollo/client'
import Stations from './Stations'
import Journeys from './Journeys'
import StationView from './StationView'

const Home = () => {
    return <div>This is the home page</div>
}

export default Home
