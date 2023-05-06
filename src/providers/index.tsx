import type { Session } from 'next-auth'
import SEOProvider from './SEO'
import StylesProvider from './styles'

import AuthProvider from './Auth'

const Providers: React.FC<React.PropsWithChildren<{ session: Session }>> = ({
	children,
	session,
}) => (
	<>
		<AuthProvider session={session}>
			<SEOProvider />
			<StylesProvider>{children}</StylesProvider>
		</AuthProvider>
	</>
)

export default Providers
