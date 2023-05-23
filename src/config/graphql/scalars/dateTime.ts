import { GraphQLDateTime } from 'graphql-scalars'
import { builder } from '../builder'

builder.addScalarType('DateTime', GraphQLDateTime, {
	parseValue(value) {
		return GraphQLDateTime.parseValue(value)
	},
	serialize(value) {
		return GraphQLDateTime.serialize(value)
	},
	parseLiteral(ast) {
		return GraphQLDateTime.parseLiteral(ast)
	},
})
