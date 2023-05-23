import { GraphQLJSON } from 'graphql-scalars'
import { builder } from '../builder'

builder.addScalarType('Json', GraphQLJSON, {
	parseValue(value) {
		return GraphQLJSON.parseValue(value)
	},
	serialize(value) {
		return GraphQLJSON.serialize(value)
	},
	parseLiteral(ast) {
		return GraphQLJSON.parseLiteral(ast)
	},
})
