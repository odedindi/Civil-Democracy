import { makeStaticProps } from '@/utils/makeStaticProps'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import DashboardLayout from '@/features/layout'

export default function Home() {
	const router = useRouter()
	const { t } = useTranslation()

	return (
		<DashboardLayout>
			<div>
				<p>{t(`lang.${router.locale}` as any)}</p>
			</div>
		</DashboardLayout>
	)
}

export const getStaticProps = makeStaticProps()
