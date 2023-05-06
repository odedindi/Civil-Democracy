import styled from 'styled-components'
import LargeScreenLayout from './components/LargeScreenLayout'
import LoginNavi from './components/LoginNavi'
import { selectMinMediaQuery, selectColor, Device } from '@/utils/themeUtils'

import SmallScreenLayout from './components/SmallScreenLayout'

const defaultBreakpoint: Device = 'laptop'
const Base = styled.div<{ breakpoint: Device }>`
	display: flex;
	flex-direction: column;

	background-color: ${selectColor('white')};
	min-height: 100vh;
	${({ breakpoint }) => selectMinMediaQuery(breakpoint)} {
		background-color: ${selectColor('bgWhite')};
	}
`
const Inner = styled.div`
	width: 100vw;
	margin: auto;
`

const ResponsiveLoginPage: React.FC<{ breakpoint?: Device }> = ({
	breakpoint = defaultBreakpoint,
}) => (
	<Base breakpoint={breakpoint}>
		<LoginNavi />
		<Inner>
			<LargeScreenLayout visiblefrom={breakpoint} />
			<SmallScreenLayout hiddenfrom={breakpoint} />
		</Inner>
	</Base>
)

export default ResponsiveLoginPage
