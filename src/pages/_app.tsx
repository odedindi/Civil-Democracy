import type { AppProps } from 'next/app'
import Providers from '@/providers'
import { appWithTranslation } from 'next-i18next'

function App({ Component, pageProps }: AppProps) {
	return (
		<Providers>
			<Component {...pageProps} />
		</Providers>
	)
}

export default appWithTranslation(App)
