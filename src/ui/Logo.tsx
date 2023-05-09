import styled from 'styled-components'

import { Image } from '@mantine/core'
import Link from 'next/link'

export const BaseLogo = styled(Image).attrs({
	src: '/assets/logo-big.svg',
	alt: 'civil-democracy logo',
	width: 165,
})``

const A = styled(Link)`
	width: min-content;
	display: block;
`

export const Logo: React.FC<{ href?: string }> = ({ href }) =>
	href ? (
		<A href={href}>
			<BaseLogo />
		</A>
	) : (
		<BaseLogo />
	)

export default Logo
