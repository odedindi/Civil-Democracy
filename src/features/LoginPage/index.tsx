import { AppShell, Grid, Header, Image } from '@mantine/core'
import { signIn, signOut, useSession } from 'next-auth/react'

import { FindYourOpenActor } from './FindYourOpenActor'
import { selectFont } from '@/utils/themeUtils'
import styled from 'styled-components'

const P = styled.p`
	${selectFont('body')}
`
const Logo = styled(Image).attrs({
	src: '/assets/logo-big.svg',
	alt: 'civil-democracy logo',
	width: 165,
})`
	margin-top: 15px;
	flex: 1;
`

const StyledButton = styled.button`
	width: 124px;
	height: 45px;
	background: black;
	color: white;
	${selectFont('body')}
`

const Login: React.FC = () => {
	return (
		<AppShell
			header={
				<Header
					height={100}
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: 20,
						padding: '0 2.5rem',
						border: 'none',
					}}
				>
					<Logo />
					<P>Create an account</P>
					<StyledButton
						onClick={() => {
							signIn()
						}}
					>
						Login
					</StyledButton>
				</Header>
			}
			padding={0}
		>
			<Grid sx={{ margin: 'auto', padding: 'auto' }}>
				<Grid.Col span={6}>
					<FindYourOpenActor />
				</Grid.Col>
				<Grid.Col span={6}>Log in container</Grid.Col>
			</Grid>
		</AppShell>
	)
}

export default Login
