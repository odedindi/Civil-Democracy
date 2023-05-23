import { schema } from './src/config/graphql/schema'
import type { CodegenConfig } from '@graphql-codegen/cli'
import { printSchema } from 'graphql'

const config: CodegenConfig = {
	overwrite: true,
	schema: printSchema(schema),
	documents: ['src/**/*.tsx', 'src/**/*.ts'],
	generates: {
		'./src/generated/': {
			preset: 'client',
			plugins: [],
		},
		'./graphql.schema.json': {
			plugins: ['introspection'],
		},
		'schema.graphql': {
			plugins: ['schema-ast'],
		},
	},
	config: {
		scalars: {
			CountryCode: 'string',
			DateTime: 'Date',
			Json: 'string',
		},
	},
	hooks: { afterAllFileWrite: ['prettier --write'] },
}

export default config
