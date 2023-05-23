// import ResponsiveProfile from '@/features/profile/ResponsiveProfile'
import { useDidMount } from '@/hooks/useDidMount'

import { makeStaticProps } from '@/utils/makeStaticProps'
import { Center, Loader } from '@mantine/core'
import { useSession } from 'next-auth/react'

const LoginPage: React.FC = () => {
	const isMounted = useDidMount()

	const { data: session } = useSession()
	const demoUser = {
		firstName: session?.user?.name,
		email: session?.user?.email,
		profileImage: session?.user?.image,
	}
	if (!isMounted)
		return (
			<Center sx={{ height: '50vh' }}>
				<Loader />
			</Center>
		)
	return <>{/* <ResponsiveProfile /> */}</>
}

export default LoginPage

export const getStaticProps = makeStaticProps()
