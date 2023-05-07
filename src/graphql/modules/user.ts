import prisma from '@/graphql/prisma'
import { builder } from '@/graphql/builder'

const Role = builder.enumType('Role', {
	values: ['ADMIN', 'USER', 'OPEN_ACTOR'] as const,
})

builder.prismaObject('User', {
	fields: (t) => ({
		id: t.exposeID('id'),
		// email: t.exposeString('email'),
		// name: t.exposeString('name'),
		// image: t.exposeString('image'),

		email: t.exposeString('email', { nullable: true }),
		image: t.exposeString('image', { nullable: true }),
		role: t.expose('role', { type: Role }),
		createdAt: t.expose('createdAt', { type: Date }),
		updatedAt: t.expose('updatedAt', { type: Date }),
	}),
})

builder.prismaObject('Permission', {
	fields: (t) => ({
		id: t.exposeID('id'),
		userId: t.exposeID('userId'),
		user: t.relation('user'),
		userPermissionId: t.exposeID('userPermissionId', { nullable: true }),
		userPermission: t.relation('userPermission'),
		permissionType: t.exposeString('permissionType'),
	}),
})

builder.prismaObject('UserPermission', {
	fields: (t) => ({
		id: t.exposeID('id'),
		userId: t.exposeID('userId'),
	}),
})

builder.queryField('users', (t) =>
	t.prismaField({
		type: ['User'],
		resolve: (query, _parent, _args, _ctx, _info) => prisma.user.findMany({ ...query }),
	}),
)
