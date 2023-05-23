import LanguageSwitchLink from '@/ui/ChangeLanguageLink'
import { makeStaticProps } from '@/utils/makeStaticProps'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import DashboardLayout from '@/features/layout'

export default function Home() {
	const router = useRouter()
	const { t } = useTranslation()

	// useEffect(() => {
	// 	router.push('/profile/login')
	// }, [router])

	return (
		<DashboardLayout>
			<div>
				<p>{t(`lang.${router.locale}` as any)}</p>
			</div>
		</DashboardLayout>
	)
}

export const getStaticProps = makeStaticProps()
