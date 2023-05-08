import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject, from } from '@apollo/client'

import { onError } from '@apollo/client/link/error'

const httpLink = new HttpLink({ uri: '/api/graphql' })

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.forEach(({ message, locations, path }) =>
			console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
		)

	if (networkError) console.log(`[Network error]: ${networkError}`)
})

const initializeApollo = (): ApolloClient<NormalizedCacheObject> =>
	new ApolloClient({
		link: from([errorLink, httpLink]),
		ssrMode: false,
		cache: new InMemoryCache(),
	})

export const apolloClient = initializeApollo()
