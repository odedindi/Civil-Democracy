import ResetPassword from '@/features/profile/resetPassword'

import { useDidMount } from '@/hooks/useDidMount'

import { makeStaticProps } from '@/utils/makeStaticProps'
import { Center, Loader } from '@mantine/core'

const ResetPasswordPage: React.FC = () => {
	const isMounted = useDidMount()

	if (!isMounted)
		return (
			<Center sx={{ height: '50vh' }}>
				<Loader />
			</Center>
		)
	return (
		<>
			<ResetPassword />
		</>
	)
}

export default ResetPasswordPage

export const getStaticProps = makeStaticProps()
