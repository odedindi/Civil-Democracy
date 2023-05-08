import { ApolloProvider, NormalizedCacheObject } from '@apollo/client'

import { ApolloClient } from '@apollo/client'
import { useEffect } from 'react'

import { apolloClient } from '@/graphql/apollo'

const useApollo = () => apolloClient

const ClearClientCache: React.FC<{
	apolloClient: ApolloClient<NormalizedCacheObject>
}> = ({ apolloClient }) => {
	useEffect(() => {
		// clean cache when component get destroyed
		return () => {
			apolloClient.resetStore()
		}
	}, [apolloClient])
	return null
}

const ApolloClientProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	const client = useApollo()
	return (
		<ApolloProvider client={client}>
			<ClearClientCache apolloClient={client} />
			{children}
		</ApolloProvider>
	)
}

export default ApolloClientProvider
