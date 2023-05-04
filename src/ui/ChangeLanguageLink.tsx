import Link from 'next/link'
import type { LinkProps } from 'next/link'
import languageDetector from '@/utils/languageDetector'
import { useRouter } from 'next/router'

const LanguageSwitchLink: React.FC<LinkProps & { locale: string }> = ({ locale, ...props }) => {
	const router = useRouter()

	let href = props.href || router.asPath

	return (
		<Link href={href} locale={locale}>
			<button
				style={{ fontSize: 'small' }}
				onClick={() => {
					if (languageDetector.cache) languageDetector.cache(locale)
				}}
			>
				{locale}
			</button>
		</Link>
	)
}

export default LanguageSwitchLink
