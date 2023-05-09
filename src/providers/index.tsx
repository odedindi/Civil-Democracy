import type { Session } from 'next-auth'
import DefaultSEO from './SEO'
import StylesProvider from './styles'

import AuthProvider from './Auth'
import QueryProvider from './Query'

const Providers: React.FC<React.PropsWithChildren<{ session: Session }>> = ({
	children,
	session,
}) => (
	<>
		<AuthProvider session={session}>
			<QueryProvider>
				<DefaultSEO />
				<StylesProvider>{children}</StylesProvider>
			</QueryProvider>
		</AuthProvider>
	</>
)

export default Providers
