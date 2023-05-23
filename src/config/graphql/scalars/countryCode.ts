import { GraphQLCountryCode } from 'graphql-scalars'
import { builder } from '../builder'

builder.addScalarType('CountryCode', GraphQLCountryCode, {
	description: 'Defined by ISO 3166-1 alpha-2',
	parseValue(value) {
		return GraphQLCountryCode.parseValue(value)
	},
	serialize(value) {
		return GraphQLCountryCode.serialize(value)
	},
	parseLiteral(ast) {
		return GraphQLCountryCode.parseLiteral(ast)
	},
})
