import { Image } from '@mantine/core'

import { FindYourOpenActor } from './FindYourOpenActor'
import styled from 'styled-components'
import LoginNow from './LoginNow'
import LoginNavi from './LoginNavi'

const Base = styled.div`
	width: 100vw;
	height: 100vh;
`

const Grid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
`

const Login: React.FC = () => {
	return (
		<Base>
			<LoginNavi />
			<Grid>
				<FindYourOpenActor />
				<LoginNow />
			</Grid>
		</Base>
	)
}

export default Login
