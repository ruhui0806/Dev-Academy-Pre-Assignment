import Header from './components/Header'
import {
    ApolloProvider,
    ApolloClient,
    InMemoryCache,
    HttpLink,
} from '@apollo/client'
import Stations from './components/Stations'

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
                <Header />
                <div className="container">
                    <Stations />
                </div>
            </ApolloProvider>
        </>
    )
}

export default App
