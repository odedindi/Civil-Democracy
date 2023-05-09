import { DefaultSeo, DefaultSeoProps } from 'next-seo'
import { useTranslation } from 'next-i18next'
import { omit } from 'lodash'

const defaultConfig: DefaultSeoProps = {
	additionalLinkTags: [{ rel: 'icon', href: '/assets/logo-small.svg' }],
	openGraph: {
		type: 'website',
		locale: 'en',
		url: 'https://civil-democracy.vercel.app/',
		siteName: 'Civil Democracy Platform',
		description: 'open graph description',
		images: [],
	},
	twitter: {
		handle: '@handle',
		site: '@site',
		cardType: 'summary_large_image',
	},
}

const extendConfig = (config?: DefaultSeoProps) => ({
	...defaultConfig,
	...config,
})

const ProvideSEO: React.FC<{ config?: DefaultSeoProps }> = ({ config = {} }) => {
	const { t } = useTranslation('common', { keyPrefix: 'seo.default' })
	const title = config?.title ?? t('title')
	const description = config?.description ?? t('description')
	return (
		<DefaultSeo
			title={title}
			description={description}
			{...extendConfig(omit(config, ['title', 'description']))}
		/>
	)
}

export default ProvideSEO
