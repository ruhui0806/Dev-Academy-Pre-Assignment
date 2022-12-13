import Header from './components/Header'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import {
    ApolloProvider,
    ApolloClient,
    InMemoryCache,
    HttpLink,
} from '@apollo/client'
import Stations from './components/Stations'
import Journeys from './components/Journeys'
import StationView from './components/StationView'
import NotFound from './components/NotFound'
import Home from './components/Home'
import StationMap from './components/StationMap'
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'http://localhost:9000/graphql',
    }),
})

function App() {
    return (
        <>
            <ApolloProvider client={client}>
                <Router>
                    <Header />
                    <div className="container">
                        <div className="d-flex gap-2">
                            <Link to="/" className="btn btn-primary p1-1">
                                Home
                            </Link>

                            <Link to="/journeys" className="btn btn-primary">
                                Journeys
                            </Link>
                            <Link to="/stations" className="btn btn-primary">
                                Stations
                            </Link>
                        </div>
                        <hr />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/journeys" element={<Journeys />} />
                            <Route path="/stations" element={<Stations />} />
                            <Route
                                path="/stations/map"
                                element={<StationMap />}
                            />
                            <Route
                                path="/stations/:id"
                                element={<StationView />}
                            />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                </Router>
            </ApolloProvider>
        </>
    )
}

export default App
