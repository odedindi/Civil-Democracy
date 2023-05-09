import styled from 'styled-components'
import { selectMaxMediaQuery, selectSpacing } from '@/utils/themeUtils'
import LoginHero from './components/LoginHero'

import LoginForm from './components/LoginForm'
import InstantUpdatesLinks from './components/InstantUpdatesLinks'
import Navi from './components/Navi'

const Base = styled.div`
	display: grid;
	grid-template-columns: 1.5fr 1fr;
	grid-row-gap: ${selectSpacing(10)}px;

	padding: ${selectSpacing(10)}px ${selectSpacing(5)}px 0;

	${selectMaxMediaQuery('laptop')} {
		grid-template-columns: 1fr;
	}
`

const HiddenOnSmallScreen = styled.span`
	${selectMaxMediaQuery('laptop')} {
		display: none;
	}
`

const Login: React.FC = () => {
	return (
		<>
			<Navi type="login" />
			<Base>
				<HiddenOnSmallScreen>
					<LoginHero />
				</HiddenOnSmallScreen>
				<LoginForm />
				<InstantUpdatesLinks />
			</Base>
		</>
	)
}

export default Login
