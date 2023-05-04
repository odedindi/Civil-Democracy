import { Image } from '@mantine/core'

import { selectColor, selectFont, selectMediaQuery, selectSpacing } from '@/utils/themeUtils'
import styled from 'styled-components'
import Input from '@/ui/primitive/Input'
import Link from 'next/link'
import LoginNowHeader from './LoginNowHeader'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'
import InstantUpdatesLinks from './InstantUpdatesLinks'
import ClickableIcon from '@/ui/primitive/ClickableIcon'
import { FindYourOpenActor } from './FindYourOpenActor'
import { useLogin } from '../hooks/useLogin'

const Base = styled.div`
	display: none;

	${selectMediaQuery('laptop')} {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
`

const LargeScreenLayout: React.FC = () => (
	<Base>
		<FindYourOpenActor />
		<LoginForm />
	</Base>
)

export default LargeScreenLayout

const LoginFormBase = styled.div`
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

	padding: 51px 35px 47px 37px;
	margin-bottom: ${selectSpacing(6)}px;
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
	:active {
		transform: translateY(1%);
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

	padding-top: ${selectSpacing(5)}px;
`

const LoginForm: React.FC = () => {
	const { t } = useTranslation('common', { keyPrefix: 'login' })
	const { username, password, onUsernameChange, onPasswordChange, onSubmit } = useLogin()

	const [hideText, setHideText] = useState(true)
	const toggleHideText = () => setHideText((prev) => !prev)
	return (
		<LoginFormBase>
			<BlueContainer>
				<LoginNowHeader />
				<form onSubmit={onSubmit}>
					<Input
						label={t('loginForm.username')}
						icon={<Image src="/assets/icons/user_merun_light.svg" alt="user-icon" />}
						style={{ marginBottom: `${selectSpacing(5.25)}px` }}
						value={username}
						onChange={({ target }) => onUsernameChange(target.value)}
						color="white"
						backgroundColor="blue"
					/>

					<Input
						type={hideText ? 'password' : 'text'}
						label={t('loginForm.password')}
						style={{ marginBottom: `${selectSpacing(2.5)}px` }}
						icon={
							<ClickableIcon
								src="/assets/icons/key_merun_light.svg"
								alt="key-icon"
								onClick={toggleHideText}
							/>
						}
						value={password}
						onChange={({ target }) => onPasswordChange(target.value)}
						color="white"
						backgroundColor="blue"
					/>
					<A href="#" passHref style={{ marginBottom: `${selectSpacing(5)}px` }}>
						{t('forgotPassword')}
					</A>
					<Row>
						<Button type="submit" disabled={!username.length || !password.length}>
							{t('loginNow')}
						</Button>
						<A href="#" passHref>
							{t('dontHaveAccount')}
						</A>
					</Row>
				</form>
			</BlueContainer>
			<InstantUpdatesLinks />
		</LoginFormBase>
	)
}
