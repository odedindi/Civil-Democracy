import Signup from '@/features/profile/signup'
import { useDidMount } from '@/hooks/useDidMount'
import { makeStaticProps } from '@/utils/makeStaticProps'
import { Center, Loader } from '@mantine/core'

const SignupPage: React.FC = () => {
	const isMounted = useDidMount()
	if (!isMounted)
		return (
			<Center sx={{ height: '50vh' }}>
				<Loader />
			</Center>
		)
	return (
		<>
			<Signup />
		</>
	)
}

export default SignupPage

export const getStaticProps = makeStaticProps()
