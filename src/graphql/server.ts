import { ApolloServer } from 'apollo-server-micro'
import { context } from './context'
import { schema } from './schema'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache'

export const server = new ApolloServer({
	cache: new InMemoryLRUCache(),
	// {
	// ~100MiB
	// maxSize: Math.pow(2, 20) * 100,
	// ttl: 300_000,
	// }

	schema,
	context,
	plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
	introspection: true,
	csrfPrevention: true,
})
