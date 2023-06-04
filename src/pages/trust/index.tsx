import DashboardLayout from '@/features/layout'
import { useDidMount } from '@/hooks/useDidMount'

import { makeStaticProps } from '@/utils/makeStaticProps'
import { Center, Loader } from '@mantine/core'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'

const TrustPage: NextPage = () => {
	const isMounted = useDidMount()
	const { data: session } = useSession()

	if (!isMounted)
		return (
			<Center sx={{ height: '50vh' }}>
				<Loader />
			</Center>
		)

	if (!session?.user) return <>no user found</>

	return <DashboardLayout>{'trust'}</DashboardLayout>
}

export const getStaticProps = makeStaticProps()

export default TrustPage
