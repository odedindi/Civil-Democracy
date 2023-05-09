import { Device, selectMinMediaQuery } from '@/utils/themeUtils'
import styled from 'styled-components'

import React, { PropsWithChildren } from 'react'

const Base = styled.div<{
	visiblefrom: Device
	columnsLayout: React.CSSProperties['gridTemplateColumns']
}>`
	display: none;

	${({ visiblefrom }) => selectMinMediaQuery(visiblefrom)} {
		display: grid;
		grid-template-columns: ${({ columnsLayout = '1fr 1fr' }) => columnsLayout};
	}
`

type LargeScreenLayoutProps = {
	visiblefrom: Device
	columnsLayout?: React.CSSProperties['gridTemplateColumns']
}

const LargeScreenLayout: React.FC<PropsWithChildren<LargeScreenLayoutProps>> = ({
	visiblefrom,
	children,
	columnsLayout,
}) => (
	<Base columnsLayout={columnsLayout} visiblefrom={visiblefrom}>
		{children}
	</Base>
)

export default LargeScreenLayout
