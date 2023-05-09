import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
	schema: './src/generated/schema.graphql',
	documents: ['src/**/*.tsx'],
	generates: {
		'./src/generated/graphql.tsx': {
			plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
		},
		'./graphql.schema.json': {
			plugins: ['introspection'],
		},
	},
	config: {
		withHooks: true,
	},
	hooks: {
		afterOneFileWrite: ['prettier --write'],
	},
}
export default config
