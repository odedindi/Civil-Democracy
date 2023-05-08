import { rule } from 'graphql-shield'

import { User } from '@prisma/client'
import { Session } from 'next-auth'
import { prisma } from './prisma'

export const getCurrentUser = async (session: Session | null): Promise<User> => {
	if (process.env.NODE_ENV !== 'production') console.log('[getCurrentUser]: start')

	try {
		if (!session || new Date() > new Date(session.expires))
			throw new Error('[getCurrentUser]: Session Expired')

		const user = await prisma.user.findUnique({
			where: { email: session.user?.email ?? undefined },
		})

		if (!user) throw new Error('[getCurrentUser]: No User found')

		if (process.env.NODE_ENV !== 'production')
			console.log(`[getCurrentUser]: user found with email ${user.email}`)

		return user
	} catch (e) {
		throw new Error('[getCurrentUser]: Error while getting current user')
	}
}

export const hasAdminPermission = (user: Required<Pick<User, 'role'>>) =>
	!user ? false : user.role === 'ADMIN'

export const isAuthenticatedRule = rule({ cache: false })(
	async (_parent, _args, { getCurrentUser }) => {
		const user = await getCurrentUser()
		return !!user
	},
)

export const isAdminRule = rule({ cache: false })(async (_parent, _args, { getCurrentUser }) => {
	const user = await getCurrentUser()
	if (!user) return true

	return hasAdminPermission(user)
})
