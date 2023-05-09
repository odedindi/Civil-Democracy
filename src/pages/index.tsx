import LanguageSwitchLink from '@/ui/ChangeLanguageLink'
import { makeStaticProps } from '@/utils/makeStaticProps'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

export default function Home() {
	const router = useRouter()
	const { t } = useTranslation()

	useEffect(() => {
		router.push('/profile/login')
	}, [router])

	return (
		<>
			<main>
				<div>
					<LanguageSwitchLink locale="de" href={'/'} />
					<br />
					<LanguageSwitchLink locale="en" href={'/'} />
					<p>{t(`lang.${router.locale}` as any)}</p>
				</div>
			</main>
		</>
	)
}

export const getStaticProps = makeStaticProps()
