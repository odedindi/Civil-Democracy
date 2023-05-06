// nextauth.d.ts
import { DefaultSession, DefaultUser } from 'next-auth'

export enum Role {
	user = 'user',
	admin = 'admin',
}

interface IUser extends DefaultUser {
	id?: string
	role?: Role
	subscribed?: boolean
}

declare module 'next-auth/jwt' {
	interface JWT extends IUser {}
}

declare module 'next-auth' {
	interface User extends IUser {
		id?: string
	}
	interface Session {
		user?: User
		token?: JWT
	}
}
