import { GraphQLScalarType } from 'graphql'
import { DateTimeResolver } from 'graphql-scalars'
export const dateTimeScalar = new GraphQLScalarType(DateTimeResolver)
