import Login from '@/features/profile/login'

import { useDidMount } from '@/hooks/useDidMount'

import { makeStaticProps } from '@/utils/makeStaticProps'
import { Center, Loader } from '@mantine/core'

const LoginPage: React.FC = () => {
	const isMounted = useDidMount()

	if (!isMounted)
		return (
			<Center sx={{ height: '50vh' }}>
				<Loader />
			</Center>
		)
	return (
		<>
			<Login />
		</>
	)
}

export default LoginPage

export const getStaticProps = makeStaticProps()
