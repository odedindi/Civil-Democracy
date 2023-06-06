import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'

import { ServerStyleSheet } from 'styled-components'
import i18nextConfig from '../../next-i18next.config'
import { resetServerContext } from 'react-beautiful-dnd'

export default class _Document extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		resetServerContext()
		const sheet = new ServerStyleSheet()
		const originalRenderPage = ctx.renderPage

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
				})

			const initialProps = await Document.getInitialProps(ctx)
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			}
		} finally {
			sheet.seal()
		}
	}

	render() {
		const currentLocale = this.props.locale ?? i18nextConfig.i18n.defaultLocale

		return (
			<Html
				lang={currentLocale}
				dir={i18nextConfig.rtlLocales.includes(currentLocale) ? 'rtl' : 'ltr'}
			>
				<Head>
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link
						href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
						rel="stylesheet"
					/>
					<link href="https://fonts.cdnfonts.com/css/campton" rel="stylesheet" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
