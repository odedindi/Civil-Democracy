import { arg, enumType, extendType, list, nonNull, nullable, objectType, stringArg } from 'nexus'
import { hash } from 'bcrypt'

import {
	User as UserNexus,
	Role as UserRoleNexus,
	Permission as PermissionNexus,
	UserPermission as UserPermissionNexus,
	Profile as ProfileNexus,
} from 'nexus-prisma'
import { NexusEnumTypeDef } from 'nexus/dist/core'
import { Role } from '@/generated/graphql'

export const UserRoleEnum = enumType(UserRoleNexus)

export const UserType = objectType({
	name: UserNexus.$name,
	description: UserNexus.$description,
	definition(t) {
		t.field(UserNexus.id)
		t.field(UserNexus.name)
		t.field(UserNexus.email)
		t.field(UserNexus.image)
		t.field(UserNexus.role)
		t.field(UserNexus.createdAt)
		t.field(UserNexus.updatedAt)
		t.field(UserNexus.blogPost)
		t.field(UserNexus.permission)
		t.field(UserNexus.profile)
		t.field(UserNexus.userPermissions)
	},
})

export const PermissionType = objectType({
	name: PermissionNexus.$name,
	description: PermissionNexus.$description,
	definition(t) {
		t.field(PermissionNexus.id)
		t.field(PermissionNexus.user)
		t.field(PermissionNexus.userId)
		t.field(PermissionNexus.userPermission)
		t.field(PermissionNexus.userPermissionId)
		t.field(PermissionNexus.permissionType)
	},
})

export const UserPermissionType = objectType({
	name: UserPermissionNexus.$name,
	description: UserPermissionNexus.$description,
	definition(t) {
		t.field(UserPermissionNexus.id)
		t.field(UserPermissionNexus.user)
		t.field(UserPermissionNexus.userId)
		t.field(UserPermissionNexus.permissions)
	},
})

export const ProfileType = objectType({
	name: ProfileNexus.$name,
	description: ProfileNexus.$description,
	definition(t) {
		t.field(ProfileNexus.id)
		t.field(ProfileNexus.user)
		t.field(ProfileNexus.userId)
		t.field(ProfileNexus.bio)
	},
})

export const Query = extendType({
	type: 'Query',
	definition(t) {
		t.field('me', {
			type: UserType.name,
			description: 'get current user',
			resolve: async (_src, _args, { getCurrentUser }) => await getCurrentUser(),
		})
		t.field('user', {
			type: UserType.name,
			description: 'get user infromation',
			args: { id: nonNull(stringArg()), email: nonNull(stringArg()) },
			resolve: async (_src, { email, id }, { prisma }) => {
				if (!email && !id) return null

				if (email) return await prisma.user.findUnique({ where: { email } })
				if (id) return await prisma.user.findUnique({ where: { id } })
				return null
			},
		})
		t.field('allUsers', {
			type: list(nullable(UserType)),
			resolve: async (_src, _args, { prisma }) => await prisma.user.findMany(),
		})
		t.field('activeSessions', {
			type: list(nullable(UserType.name)),
			description: 'get active users',
			resolve: async (_src, _args, { prisma }) =>
				await prisma.user.findMany({
					where: { sessions: { every: { expires: { gte: new Date() } } } },
				}),
		})
	},
})

export const Mutation = extendType({
	type: 'Mutation',
	definition(t) {
		t.field('addUser', {
			type: UserType.name,
			args: {
				email: nonNull(stringArg()),
				name: nullable(stringArg()),
				password: nullable(stringArg()),
				role: nullable(arg({ type: UserRoleEnum.name })),
			},
			resolve: async (_, { email, name, password, role }, { prisma }) => {
				if (process.env.NODE_ENV !== 'production') console.log('adding user', email)

				const existingUser = await prisma.user.findUnique({ where: { email } })

				if (existingUser) {
					throw new Error(`[BAD_USER_INPUT] User with email "${email}" already exists`)
				}

				const hashedPwd = password ? await hash(password, 10) : undefined

				const user = await prisma.user.create({
					data: {
						password: hashedPwd,
						name: name ?? '',
						email,
						role: role ?? undefined,
						createdAt: new Date(),
					},
				})

				return user
			},
		})
		t.field('deleteUser', {
			type: UserType.name,
			args: { id: nonNull(stringArg()) },
			resolve: async (_, { id }, { prisma, getCurrentUser, hasAdminPermission }) => {
				const currentUser = await getCurrentUser()
				if (!currentUser) throw new Error('Session expired')
				if (id !== currentUser?.id) {
					if (!hasAdminPermission) throw new Error('No permission to perform this action')
				}
				const user = await prisma.user.findUnique({ where: { id } })

				// if (!user?.canBeEdited) throw new Error('[INVALID_OPERATION] You cant delete this user.')

				return prisma.user.delete({ where: { id } })
			},
		})
		t.field('updateMe', {
			type: UserType.name,
			args: {
				name: nullable(stringArg()),
				email: nullable(stringArg()),
				password: nullable(stringArg()),
				role: nullable(arg({ type: UserRoleEnum })),
			},
			resolve: async (_, { password, ...args }, { prisma, session, getCurrentUser }) => {
				const user = await getCurrentUser()
				if (!user) return null
				return prisma.user.update({
					where: { id: session?.user?.id },
					data: {
						...(Object.keys(args) as Array<keyof typeof args>).reduce(async (acc, key, i, arr) => {
							if (i === arr.length - 1) return { ...acc, updatedAt: new Date() }
							if (!args[key]) return acc
							if (password) return { ...acc, password: await hash(password, 10) }
							return { ...acc, [key]: args[key] }
						}, {}),
					},
				})
			},
		})
	},
})
