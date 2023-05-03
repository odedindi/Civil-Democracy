import { Image, ActionIcon } from '@mantine/core'

import { selectColor, selectFont, selectSpacing, setOpacity } from '@/utils/themeUtils'
import styled from 'styled-components'
import Input from '@/primitive/Input'
import Link from 'next/link'
import LoginNowHeader from './LoginNowHeader'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'

const Base = styled.div`
	margin: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const BlueContainer = styled.div`
	width: 498px;
	height: 492px;
	background-color: ${selectColor('blue')};
	border-radius: ${selectSpacing(3.125)}px;
	margin: auto;
	padding: 51px 35px 47px 37px;
	display: flex;
	flex-direction: column;
	align-items: stretch;
`

const Button = styled.button`
	width: 167px;
	height: 51px;
	background: ${selectColor('white')};
	color: ${selectColor('black')};
	${selectFont('body')};
	border-radius: ${selectSpacing(1)}px;
	font-family: 'Work Sans';

	transition: color, background, 0.2s ease;
	:disabled {
		color: ${selectColor('blue')};
		background: ${selectColor('white', (color) => setOpacity(color, 0.5))};
	}
`

const A = styled(Link)`
	${selectFont('camptonMd')}
	color: ${selectColor('white')};
	text-decoration: underline;
	text-decoration-color: ${selectColor('white')};
`

const Row = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`

const Footer = styled.div`
	padding-top: ${selectSpacing(6)}px;
	display: flex;
	flex-direction: column;

	gap: ${selectSpacing(2)}px;
	justify-content: center;
	align-items: center;
`

const P = styled.p`
	${selectFont('body')}
`

const LoginNow: React.FC = () => {
	const { t } = useTranslation('common', { keyPrefix: 'login' })

	const [loginForm, setLoginForm] = useState({ username: '', password: '' })

	return (
		<Base>
			<BlueContainer>
				<LoginNowHeader />
				<form
					onSubmit={(e) => {
						e.preventDefault()
						console.log('login clicked', loginForm)
					}}
				>
					<Input
						label={t('loginForm.username')}
						icon={<Image src="/assets/icons/user.svg" alt="user-icon" />}
						style={{ marginBottom: `${selectSpacing(5.25)}px` }}
						value={loginForm.username}
						onChange={({ target }) => setLoginForm((prev) => ({ ...prev, username: target.value }))}
					/>

					<Input
						type="password"
						label={t('loginForm.password')}
						style={{ marginBottom: `${selectSpacing(2.5)}px` }}
						value={loginForm.password}
						onChange={({ target }) => setLoginForm((prev) => ({ ...prev, password: target.value }))}
					/>
					<A href="#" passHref style={{ marginBottom: `${selectSpacing(5)}px` }}>
						{t('forgotPassword')}
					</A>
					<Row>
						<Button
							type="submit"
							disabled={!loginForm.username.length || !loginForm.password.length}
						>
							{t('loginNow')}
						</Button>
						<A href="#" passHref>
							{t('dontHaveAccount')}
						</A>
					</Row>
				</form>
			</BlueContainer>
			<Footer>
				<P>{t('footer.instantUpdates')}</P>
				<Row style={{ gap: `${selectSpacing(4)}px` }}>
					<ActionIcon variant="transparent" component={Link} href={'#'} title="Instagram">
						<Image src="/assets/icons/instagram.svg" alt="user-icon" width={24} />
					</ActionIcon>
					<ActionIcon variant="transparent" component={Link} href={'#'} title="Twitter">
						<Image src="/assets/icons/twitter.svg" alt="user-icon" width={24} />
					</ActionIcon>
				</Row>
			</Footer>
		</Base>
	)
}

export default LoginNow
