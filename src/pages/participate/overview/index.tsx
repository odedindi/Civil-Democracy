import DashboardLayout from '@/features/layout'
import { DndListHandle, QuoteApp } from '@/features/participate/components/VoteQueries'
import { useDidMount } from '@/hooks/useDidMount'

import { makeStaticProps } from '@/utils/makeStaticProps'
import { Center, Loader } from '@mantine/core'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

const ParticipationPage: NextPage = () => {
	const isMounted = useDidMount()
	const { data: session } = useSession()

	const [data, setData] = useState(() => [...mockData])
	if (!isMounted)
		return (
			<Center sx={{ height: '50vh' }}>
				<Loader />
			</Center>
		)

	if (!session?.user) return <>no user found</>

	return (
		<DashboardLayout>
			{'overview'}
			{process.env.NODE_ENV === 'development' ? (
				<>
					<QuoteApp />
					<DndListHandle data={data} />
				</>
			) : null}
		</DashboardLayout>
	)
}

export const getStaticProps = makeStaticProps()

export default ParticipationPage

const mockData = [
	{ position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
	{ position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
]
