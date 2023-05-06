import { Device, selectMinMediaQuery } from '@/utils/themeUtils'
import styled from 'styled-components'
import LargeScreenLayoutLoginForm from './LargeScreenLayoutLoginForm'

import React from 'react'
import LargeScreenLayoutHero from './LargeScreenLayoutHero'

const Base = styled.div<{ visiblefrom: Device }>`
	display: none;

	${({ visiblefrom }) => selectMinMediaQuery(visiblefrom)} {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
`

const LargeScreenLayout: React.FC<{ visiblefrom: Device }> = ({ visiblefrom }) => (
	<Base visiblefrom={visiblefrom}>
		<LargeScreenLayoutHero />
		<LargeScreenLayoutLoginForm />
	</Base>
)

export default LargeScreenLayout
