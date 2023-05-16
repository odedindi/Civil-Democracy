import Logo from '@/ui/Logo'
import { selectMinMediaQuery } from '@/utils/themeUtils'
import { Burger as MantineBurger } from '@mantine/core'

import styled from 'styled-components'

const Base = styled.div`
	display: flex;
	align-items: center;
	height: 100%;
`

const Burger = styled(MantineBurger)`
	${selectMinMediaQuery('tablet')} {
		display: none;
	}
`
const Header: React.FC<{ openNavbar: boolean; toggleNavbar: () => void }> = ({
	openNavbar,
	toggleNavbar,
}) => {
	return (
		<Base>
			<Burger opened={openNavbar} onClick={toggleNavbar} size="sm" mr="xl" />
			<Logo href="/" />
		</Base>
	)
}

export default Header
