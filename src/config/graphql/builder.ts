import { PrismaClient, UserRole } from '@prisma/client'
import type { User } from '@prisma/client'
import SchemaBuilder from '@pothos/core'
import PrismaPlugin from '@pothos/plugin-prisma'
import ScopeAuthPlugin from '@pothos/plugin-scope-auth'
import type PrismaTypes from '@pothos/plugin-prisma/generated'

const prisma = new PrismaClient({})

export const builder = new SchemaBuilder<{
	PrismaTypes: PrismaTypes
	AuthScopes: { isAdmin: boolean }
	Context: {
		userId: User['id']
		role: User['role']
	}
	Scalars: {
		CountryCode: {
			Input: string
			Output: string
		}
		DateTime: {
			Input: Date
			Output: Date
		}
		Json: {
			Input: string
			Output: string
		}
	}
}>({
	prisma: { client: prisma },
	plugins: [PrismaPlugin, ScopeAuthPlugin],
	authScopes: async ({ role }) => ({ isAdmin: role === 'ADMIN' }),
})
