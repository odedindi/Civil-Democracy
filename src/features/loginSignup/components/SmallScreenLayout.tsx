import { Device, selectMinMediaQuery, selectSpacing } from '@/utils/themeUtils'

import styled from 'styled-components'

import { PropsWithChildren } from 'react'

const Base = styled.div<{ hiddenfrom: Device }>`
	display: flex;
	flex-direction: column;

	${({ hiddenfrom }) => selectMinMediaQuery(hiddenfrom)} {
		display: none;
	}
`

type SmallScreenLayoutProps = {
	hiddenfrom: Device
}
const SmallScreenLayout: React.FC<PropsWithChildren<SmallScreenLayoutProps>> = ({
	hiddenfrom,

	children,
}) => <Base hiddenfrom={hiddenfrom}>{children}</Base>

export default SmallScreenLayout
