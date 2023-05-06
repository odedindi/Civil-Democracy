import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import NextAuth, { Session, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'

const {
	GOOGLE_CLIENT_ID = '',
	GOOGLE_CLIENT_SECRET = '',
	GITHUB_ID = '',
	GITHUB_SECRET = '',
	NEXTAUTH_SECRET,
} = process.env

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
		}),
		GithubProvider({
			clientId: GITHUB_ID,
			clientSecret: GITHUB_SECRET,
		}),
		// ...add more providers here
	],
	secret: NEXTAUTH_SECRET,
	callbacks: {
		jwt: async ({ token, user }: { token: JWT; user: User }) => {
			if (user) {
				token.id = user.id
				token.role = user.role
				token.subscribed = user.subscribed
			}
			return token
		},
		session: ({ session, token }: { session: Session; token: JWT }) => {
			if (token && session.user) {
				session.user.role = token.role
				session.user.subscribed = token.subscribed
				session.user.id = token.id
			}
			return session
		},
	},
}
export default NextAuth(authOptions)
