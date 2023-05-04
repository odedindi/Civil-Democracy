import { Image } from '@mantine/core'
import styled from 'styled-components'

const ClickableIcon = styled(Image)`
	cursor: pointer;

	:active {
		transform: translateY(-5%);
	}
`

export default ClickableIcon
