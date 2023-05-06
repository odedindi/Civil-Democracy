import type { AppProps } from 'next/app'
import Providers from '@/providers'
import { appWithTranslation } from 'next-i18next'

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<Providers session={session}>
			<Component {...pageProps} />
		</Providers>
	)
}

export default appWithTranslation(App)
