import styled from 'styled-components'
import { selectMaxMediaQuery, selectSpacing } from '@/utils/themeUtils'
import SignupHero from './components/SignupHero'

import SignupForm from './components/SignupForm'

import Navi from './components/Navi'

const Base = styled.div`
	display: grid;
	grid-template-columns: 1fr 1.5fr;
	grid-row-gap: ${selectSpacing(5)}px;

	padding: ${selectSpacing(3)}px ${selectSpacing(3)}px 0;

	${selectMaxMediaQuery('laptop')} {
		grid-template-columns: 1fr;
	}
`

const HiddenOnSmallScreen = styled.span`
	margin: auto;
	${selectMaxMediaQuery('laptop')} {
		display: none;
	}
`

const Signup: React.FC = () => {
	return (
		<>
			<Navi type="signup" />
			<Base>
				<SignupForm />
				<HiddenOnSmallScreen>
					<SignupHero />
				</HiddenOnSmallScreen>
			</Base>
		</>
	)
}

export default Signup
