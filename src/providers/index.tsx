import type { Session } from 'next-auth'
import SEOProvider from './SEO'
import StylesProvider from './styles'

import AuthProvider from './Auth'
import ApolloClientProvider from './Apollo'

const Providers: React.FC<React.PropsWithChildren<{ session: Session }>> = ({
	children,
	session,
}) => (
	<>
		<SEOProvider />
		<ApolloClientProvider>
			<AuthProvider session={session}>
				<StylesProvider>{children}</StylesProvider>
			</AuthProvider>
		</ApolloClientProvider>
	</>
)

export default Providers
