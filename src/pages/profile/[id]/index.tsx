import DashboardLayout from '@/features/layout'
import { useDidMount } from '@/hooks/useDidMount'

import { makeStaticProps } from '@/utils/makeStaticProps'
import { Center, Loader } from '@mantine/core'
import type { GetStaticPaths, NextPage } from 'next'
import { useSession } from 'next-auth/react'

import ProfileForm from '@/features/profile/components/ProfileForm'

const ProfilePage: NextPage = () => {
	const isMounted = useDidMount()
	const { data: session } = useSession()

	if (!isMounted)
		return (
			<Center sx={{ height: '50vh' }}>
				<Loader />
			</Center>
		)

	if (!session?.user) return <>no user found</>

	return (
		<DashboardLayout>{session.user ? <ProfileForm user={session.user} /> : null}</DashboardLayout>
	)
}

export const getStaticProps = makeStaticProps()
export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: false,
	}
}

export default ProfilePage
