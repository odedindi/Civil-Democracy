import DashboardLayout from '@/features/layout'
import VoteQueries from '@/features/participate/components/VoteQueries'
import { VoteQuery } from '@/features/participate/components/types'

import { useDidMount } from '@/hooks/useDidMount'

import { makeStaticProps } from '@/utils/makeStaticProps'
import { Center, Loader } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'

const ParticipationPage: NextPage = () => {
	const isMounted = useDidMount()
	const { data: session } = useSession()

	const { data, isLoading } = useQuery<{ queries: VoteQuery[] }>({
		queryKey: ['participation-overview'],
		queryFn: async () => {
			const res = await fetch('/mockData.json')
			return await res.json()
		},
	})

	if (!isMounted || isLoading)
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
					<VoteQueries queries={data?.queries ?? []} />
				</>
			) : null}
		</DashboardLayout>
	)
}

export const getStaticProps = makeStaticProps()

export default ParticipationPage
