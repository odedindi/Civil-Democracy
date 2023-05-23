import { schema } from '@/config/graphql/schema'
import { writeFileSync } from 'fs'
import { printSchema, lexicographicSortSchema } from 'graphql'

const schemaAsString = printSchema(lexicographicSortSchema(schema))

writeFileSync('./generated/schema.graphql', schemaAsString)
