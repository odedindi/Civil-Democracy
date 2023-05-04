import styled from 'styled-components'
import LargeScreenLayout from './components/LargeScreenLayout'
import LoginNavi from './components/LoginNavi'
import { selectMediaQuery, selectColor } from '@/utils/themeUtils'

import SmallScreenLayout from './components/SmallScreenLayout'

const Base = styled.div`
	width: 100vw;
	height: 100vh;

	background-color: ${selectColor('white')};
	${selectMediaQuery('laptop')} {
		background-color: ${selectColor('bgWhite')};
	}
`

const Login: React.FC = () => (
	<Base>
		<LoginNavi />
		<LargeScreenLayout />
		<SmallScreenLayout />
	</Base>
)

export default Login
