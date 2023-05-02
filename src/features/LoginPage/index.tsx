import { Image } from '@mantine/core'

import { FindYourOpenActor } from './FindYourOpenActor'
import { selectFont, selectSpacing } from '@/utils/themeUtils'
import styled from 'styled-components'
import LoginNow from './LoginNow'

const Base = styled.div`
	width: 100vw;
	height: 100vh;
`

const Navi = styled.nav`
	width: 100%;
	height: 100px;
	display: flex;
	align-items: center;
	gap: ${selectSpacing(2.5)}px;
	padding: 0 ${selectSpacing(2.5)}px;
`

const P = styled.p`
	${selectFont('body')}
`
const Logo = styled(Image).attrs({
	src: '/assets/logo-big.svg',
	alt: 'civil-democracy logo',
	width: 165,
})`
	flex: 1;
`

const Button = styled.button`
	width: 124px;
	height: 45px;
	background: #0f0f0f;
	color: white;
	${selectFont('body')};
	border-radius: ${selectSpacing(1)}px;
`

const Grid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
`

const Login: React.FC = () => {
	return (
		<Base>
			<Navi>
				<Logo />
				<P>Create an account</P>
				<Button
					onClick={() => {
						console.log('login clicked')
					}}
				>
					Login
				</Button>
			</Navi>
			<Grid>
				<FindYourOpenActor />
				<LoginNow />
			</Grid>
		</Base>
	)
}

export default Login
