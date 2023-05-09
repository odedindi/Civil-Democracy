import ResponsiveLogin from '@/features/loginSignup/ResponsiveLogin'
import { useDidMount } from '@/hooks/useDidMount'
import { useNationalities } from '@/features/loginSignup/hooks/useNationalities'
import { makeStaticProps } from '@/utils/makeStaticProps'
import { Center, Loader } from '@mantine/core'

const LoginPage: React.FC = () => {
	const isMounted = useDidMount()
	// fetch(
	// 	'https://gist.githubusercontent.com/marijn/274449/raw/0045fb5f54f9ad357e301cf30e23d9834058618a/nationalities.txt',
	// )
	// 	.then((r) => r.text())
	// 	.then((data) => console.log(data.split(/\r?\n/)))
	// const { isLoading, isError, data, error } = useNationalities()
	// console.log(isLoading, data)
	if (!isMounted)
		return (
			<Center sx={{ height: '50vh' }}>
				<Loader />
			</Center>
		)
	return (
		<>
			<ResponsiveLogin />
		</>
	)
}

export default LoginPage

export const getStaticProps = makeStaticProps()
