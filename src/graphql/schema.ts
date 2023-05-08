import { makeSchema } from 'nexus'

import * as modules from './modules'
import { join } from 'path'
import { cwd } from 'process'
import * as scalars from './scalars'

import { shield } from 'graphql-shield'
import permissions from './permissions'
import { applyMiddleware } from 'graphql-middleware'

export const schema = applyMiddleware(
	makeSchema({
		shouldGenerateArtifacts: process.env.NODE_ENV === 'development',
		types: [modules, scalars],
		prettierConfig: join(cwd(), '.prettierrc'),
		contextType: {
			module: join(cwd(), 'src', 'graphql', 'context.ts'),
			export: 'Context',
		},
		outputs: {
			schema: join(cwd(), 'src', 'generated', 'schema.graphql'),
			typegen: join(cwd(), 'src', 'generated', 'nexus-types.d.ts'),
		},
	}),
	shield(permissions, { allowExternalErrors: true }),
)
