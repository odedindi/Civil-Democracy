import { NextResponse } from 'next/server'

import nextI18nextConfig from '../../next-i18next.config'
import { MiddlewareFactory } from './types'

const PUBLIC_FILE = /\.(.*)$/

export const withLocale: MiddlewareFactory = (next) => (req) => {
	const pathWith_next = req.nextUrl.pathname.startsWith('/_next')
	const pathWithApi = req.nextUrl.pathname.includes('/api/')
	const isPublicFile = PUBLIC_FILE.test(req.nextUrl.pathname)
	if (pathWith_next || pathWithApi || isPublicFile) return

	
	if (req.nextUrl.locale === 'default') {
		const locale = req.cookies.get('NEXT_LOCALE')?.value || nextI18nextConfig.i18n.defaultLocale
		return NextResponse.redirect(
			new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url),
		)
	}
}
