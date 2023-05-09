import { Image, ActionIcon } from '@mantine/core'

import { selectColor, selectFont, selectSpacing } from '@/utils/themeUtils'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import InstantUpdatesLinks from './InstantUpdatesLinks'

import Link from 'next/link'
import { useState } from 'react'
import { LoginForm } from '../hooks/useLogin'
import InputField from '@/ui/primitive/InputField'

const Base = styled.div`
	margin: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
`
const Header = styled.div`
	display: grid;
	grid-template-columns: auto 1fr;
	grid-template-rows: auto auto;
	gap: ${selectSpacing(2)}px;
	color: ${selectColor('white')};
	margin-bottom: ${selectSpacing(5)}px;
`
const IconContainer = styled.div`
	background-color: white;
	border-radius: ${selectSpacing(1.25)}px;
	padding: ${selectSpacing(0.5)}px;
	width: ${selectSpacing(8)}px;
	height: ${selectSpacing(8)}px;
	display: flex;
	justify-content: center;
	align-items: center;

	grid-column: 1/2;
	grid-row: 1/3;
`

const Title = styled.h2`
	${selectFont('h2')};
	position: relative;
	top: ${selectSpacing(0.75)}px;
`

const SubTitle = styled.p`
	${selectFont('camptonMd')};
	position: relative;
	bottom: ${selectSpacing(0.5)}px;
`

const BlueContainer = styled.div`
	width: 498px;
	min-height: 492px;
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

const StyledInputField = styled(InputField).attrs({
	color: 'white',
	bordercolor: 'white',
	backgroundcolor: 'blue',
	errorcolor: 'paleOrange',
	required: true,
})`
	margin-bottom: ${selectSpacing(2.5)}px;
`
const LargeScreenLoginForm: React.FC<{ loginForm: LoginForm }> = ({ loginForm }) => {
	const { t } = useTranslation('common', { keyPrefix: 'profile.loginForm' })
	const { form, onSubmit } = loginForm

	const [hideText, setHideText] = useState(true)
	const toggleHideText = () => setHideText((prev) => !prev)
	return (
		<Base>
			<BlueContainer>
				<Header>
					<IconContainer>
						<Image src="/assets/icons/login.svg" alt="login-icon" width={48} height={48} />
					</IconContainer>
					<Title>{t('loginNow')}</Title>
					<SubTitle>{t('subtitle')}</SubTitle>
				</Header>
				<form onSubmit={onSubmit}>
					<StyledInputField
						label={t('username')}
						icon={
							<ActionIcon size={20} radius="md" disabled>
								<Image src="/assets/icons/user_merun_light.svg" alt="user-icon" />
							</ActionIcon>
						}
						{...form.getInputProps('username')}
					/>

					<StyledInputField
						type={hideText ? 'password' : 'text'}
						label={t('password')}
						icon={
							<ActionIcon size={20} radius="md" onClick={toggleHideText}>
								<Image src="/assets/icons/key_merun_light.svg" alt="key-icon" />
							</ActionIcon>
						}
						{...form.getInputProps('password')}
					/>
					<A href="#" passHref style={{ marginBottom: `${selectSpacing(5)}px` }}>
						{t('forgotPassword')}
					</A>
					<Row>
						<Button
							type="submit"
							disabled={!form.values.username.length || !form.values.password.length}
						>
							{t('loginNow')}
						</Button>
						<A href="/profile/signup" passHref>
							{t('dontHaveAccount')}
						</A>
					</Row>
				</form>
			</BlueContainer>
			<InstantUpdatesLinks />
		</Base>
	)
}

export default LargeScreenLoginForm
