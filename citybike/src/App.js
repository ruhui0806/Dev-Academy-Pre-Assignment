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

                            <Link to="/stations" className="btn btn-primary">
                                Stations
                            </Link>
                            <Link to="/journeys" className="btn btn-primary">
                                Journeys
                            </Link>
                        </div>
                        <hr />
                        <Routes>
                            <Route path="/stations" element={<Stations />} />
                            <Route path="/journeys" element={<Journeys />} />
                        </Routes>
                    </div>
                </Router>
            </ApolloProvider>
        </>
    )
}

export default App
