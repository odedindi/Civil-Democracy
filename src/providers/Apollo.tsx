import { ApolloProvider } from '@apollo/client'

import { ApolloClient, InMemoryCache } from '@apollo/client'

const apolloClient = new ApolloClient({
	uri: '/api/graphql',
	cache: new InMemoryCache(),
})

const ApolloClientProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
	<ApolloProvider client={apolloClient}>{children}</ApolloProvider>
)

export default ApolloClientProvider
