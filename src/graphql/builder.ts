import SchemaBuilder from '@pothos/core'
import PrismaPlugin from '@pothos/plugin-prisma'
import type PrismaTypes from '@pothos/plugin-prisma/generated'
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient({})
const { POSTGRES_URL_NON_POOLING } = process.env
const readOnlyPrisma = new PrismaClient({
	datasources: {
		db: { url: POSTGRES_URL_NON_POOLING },
	},
})

export const builder = new SchemaBuilder<{
	Context: { user: { isAdmin: boolean } }
	PrismaTypes: PrismaTypes
}>({
	plugins: [PrismaPlugin],
	prisma: {
		client: (ctx) => (ctx.user.isAdmin ? prisma : readOnlyPrisma),
		dmmf: Prisma.dmmf,

		exposeDescriptions: true,
		// use where clause from prismaRelatedConnection for totalCount (will true by default in next major version)
		filterConnectionTotalCount: true,
	},
})

builder.queryType({
	fields: (t) => ({
		ok: t.boolean({
			resolve: () => true,
		}),
	}),
})
