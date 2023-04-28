import SEOProvider from './SEO'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import StylesProvider from './styles'

const Providers: React.FC<React.PropsWithChildren<{ session: Session }>> = ({
	children,
	session,
}) => (
	<>
		<SessionProvider session={session}>
			<SEOProvider />
			<StylesProvider>{children}</StylesProvider>
		</SessionProvider>
	</>
)

export default Providers
