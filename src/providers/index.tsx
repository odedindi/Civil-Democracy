import type { Session } from 'next-auth'
import SEOProvider from './SEO'
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
				<SEOProvider />
				<StylesProvider>{children}</StylesProvider>
			</QueryProvider>
		</AuthProvider>
	</>
)

export default Providers
