import SEOProvider from './SEO'
import StylesProvider from './styles'

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => (
	<>
		<SEOProvider />
		<StylesProvider>{children}</StylesProvider>
	</>
)

export default Providers
