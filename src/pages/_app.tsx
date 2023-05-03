import type { AppProps } from 'next/app'
import Providers from '@/providers'
import { appWithTranslation } from 'next-i18next'
// import i18n from '../../i18n'

function App({ Component, pageProps }: AppProps) {
	return (
		<Providers>
			<Component {...pageProps} />
		</Providers>
	)
}

export default appWithTranslation(App)
