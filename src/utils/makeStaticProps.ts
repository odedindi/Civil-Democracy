import { PreviewData, Redirect } from 'next'

import { ParsedUrlQuery } from 'querystring'
import i18nextConfig from '../../next-i18next.config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type GetStaticPropsContext<Q extends ParsedUrlQuery = ParsedUrlQuery> = {
	params?: Q
	preview?: boolean
	previewData?: PreviewData
	locale?: string
	locales?: string[]
	defaultLocale?: string
}
type GetStaticPropsResult<P> =
	| { props: P; revalidate?: number | boolean }
	| { redirect: Redirect; revalidate?: number | boolean }
	| { notFound: true }

type GetStaticProps<
	P extends { [key: string]: unknown } = { [key: string]: unknown },
	Q extends ParsedUrlQuery = ParsedUrlQuery,
> = (
	context: GetStaticPropsContext<Q>,
) => Promise<GetStaticPropsResult<P>> | GetStaticPropsResult<P>

const getI18nProps = async (ctx: GetStaticPropsContext) => {
	const locale = ctx?.locale ?? i18nextConfig.i18n.defaultLocale
	const props = {
		...(await serverSideTranslations(locale, ['common'])),
	}
	return props
}

export const makeStaticProps = (): GetStaticProps => async (ctx) => ({
	props: await getI18nProps(ctx),
})
