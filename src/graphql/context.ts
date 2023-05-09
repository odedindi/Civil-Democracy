// import { User } from "@prisma/client"
import { NextApiRequest } from 'next'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import { prisma, PrismaClient } from './prisma'
import { getCurrentUser, hasAdminPermission } from './auth'
import { User } from '@prisma/client'

export interface Context {
	prisma: PrismaClient
	session: Session | null
	getCurrentUser: () => User | null
	hasAdminPermission: boolean
}

export const context = async ({ req }: { req: NextApiRequest }): Promise<Context> => {
	const session = await getSession({ req })
	const currentUser = session ? await getCurrentUser(session) : null

	return {
		prisma,
		session,
		getCurrentUser: () => currentUser,
		hasAdminPermission: currentUser ? hasAdminPermission(currentUser) : false,
	}
}
