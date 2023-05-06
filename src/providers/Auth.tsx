import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

const AuthProvider: React.FC<React.PropsWithChildren<{ session?: Session }>> = ({
	children,
	session,
}) => <SessionProvider session={session}>{children}</SessionProvider>

export default AuthProvider
