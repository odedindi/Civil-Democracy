// nextauth.d.ts
import { DefaultSession, DefaultUser } from 'next-auth'
import type { UserRole, User as PrismaUser } from '@prisma/client'

interface IUser extends DefaultUser {
	id: string
	role: UserRole
	subscribed?: boolean
}

declare module 'next-auth/jwt' {
	interface JWT extends IUser {
		role: UserRole
		id: PrismaUser['id']
	}
}

declare module 'next-auth' {
	interface User extends IUser {}
	interface Session {
		user?: User
		token?: JWT
	}
}
