import { DefaultSeo, DefaultSeoProps } from 'next-seo'

const SEOconfig: DefaultSeoProps = {
	title: 'default page title',
	description: 'default page description',
	additionalLinkTags: [{ rel: 'icon', href: '/assets/logo-small.svg' }],
	openGraph: {
		type: 'website',
		locale: 'en_IE',
		url: 'https://www.url.ie/',
		siteName: 'SiteName',
		description: 'open graph description',
		images: [],
	},
	twitter: {
		handle: '@handle',
		site: '@site',
		cardType: 'summary_large_image',
	},
}

const SEOProvider: React.FC = () => <DefaultSeo {...SEOconfig} />

export default SEOProvider
