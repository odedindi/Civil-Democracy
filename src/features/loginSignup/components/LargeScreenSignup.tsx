import { Device, selectMinMediaQuery } from '@/utils/themeUtils'
import styled from 'styled-components'
import LargeScreenLayoutLoginForm from './LargeScreenLoginForm'

import React from 'react'
import LargeScreenLayoutLoginHero from './LargeScreenLoginHero'
import { LoginForm } from '../hooks/useLogin'

const Base = styled.div<{ visiblefrom: Device }>`
	display: none;

	${({ visiblefrom }) => selectMinMediaQuery(visiblefrom)} {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
`

type LargeScreenLayoutLoginProps = {
	visiblefrom: Device
	loginForm: LoginForm
}

const LargeScreenLayoutLogin: React.FC<LargeScreenLayoutLoginProps> = ({
	loginForm,
	visiblefrom,
}) => (
	<Base visiblefrom={visiblefrom}>
		<LargeScreenLayoutLoginHero />
		<LargeScreenLayoutLoginForm loginForm={loginForm} />
	</Base>
)

export default LargeScreenLayoutLogin
