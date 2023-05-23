import { prisma } from '../prisma'
import { builder } from '../builder'
import { UserRole } from '@prisma/client'

builder.enumType(UserRole, { name: 'UserRole' })

builder.prismaObject('User', {
	fields: (t) => ({
		id: t.exposeID('id'),
		// createdAt: t.expose('createdAt', {
		// 	type: 'DateTime',
		// }),
		// updatedAt: t.expose('updatedAt', {
		// 	type: 'DateTime',
		// }),
		email: t.exposeString('email'),
		password: t.exposeString('password', {
			nullable: true,
		}),
		name: t.exposeString('name'),
		// emailVerified: t.expose('emailVerified', {
		// 	type: 'DateTime',
		// 	nullable: true,
		// }),
		image: t.exposeString('image', {
			nullable: true,
		}),
		description: t.exposeString('description', {
			nullable: true,
		}),
		// role: t.expose('role', {
		// 	type: UserRole,
		// 	// resolve: (user) => user.role as UserRole,
		// }),
		// sessions: t.relation('sessions'),
		// accounts: t.relation('accounts'),
	}),
})

builder.queryType({
	fields: (t) => ({
		me: t.prismaField({
			type: 'User',
			nullable: true,
			resolve: (_query, _root, _args, { userId }) => {
				return prisma.user.findUnique({ where: { id: userId } })
			},
		}),
		users: t.prismaField({
			type: ['User'],
			// authScopes: {
			// 	isAdmin: false,
			// },
			resolve: () => {
				return prisma.user.findMany({})
			},
		}),
	}),
})
