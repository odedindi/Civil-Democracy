import {
	Device,
	selectColor,
	selectFont,
	selectMinMediaQuery,
	selectSpacing,
} from '@/utils/themeUtils'

import ClickableIcon from '@/ui/primitive/ClickableIcon'
import { Color } from '@/config/theme'
import { Image } from '@mantine/core'
import Input from '@/ui/primitive/Input'
import Link from 'next/link'
import styled from 'styled-components'
import { useLogin } from '../hooks/useLogin'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'

const A = styled(Link)`
	${selectFont('camptonSm')};
	color: ${selectColor('gray')};
	text-decoration: none;

	display: block;
	text-align: center;
	padding: ${selectSpacing(1.75)}px 0;
`
const P = styled.p`
	${selectFont('campton')};
	color: ${selectColor('black')};
	text-align: center;
	margin-bottom: ${selectSpacing(2.75)}px;
`
const Button = styled.button<{ backgroundColor?: Color; borderColor?: Color; color?: Color }>`
	width: 100%;
	height: 64px;
	background-color: ${({ backgroundColor = 'black' }) => selectColor(backgroundColor)};
	color: ${({ color = 'white' }) => selectColor(color)};
	${selectFont('body')};

	border-radius: ${selectSpacing(1)}px;
	border: solid 1px ${({ color = 'white' }) => selectColor(color)};
	:active {
		transform: translateY(-1%);
	}
`
const SmallScreenLayoutLoginForm: React.FC = () => {
	const { t } = useTranslation('common', { keyPrefix: 'login' })

	const { username, password, onUsernameChange, onPasswordChange, onSubmit } = useLogin()

	const [hideText, setHideText] = useState(true)
	const toggleHideText = () => setHideText((prev) => !prev)

	return (
		<form onSubmit={onSubmit}>
			<Input
				label={t('loginForm.username')}
				icon={<Image src="/assets/icons/user_blue.svg" alt="user-icon" />}
				style={{ margin: `${selectSpacing(3.25)}px 0 ${selectSpacing(3)}px` }}
				value={username}
				onChange={({ target }) => onUsernameChange(target.value)}
			/>

			<Input
				type={hideText ? 'password' : 'text'}
				label={t('loginForm.password')}
				style={{ marginBottom: `${selectSpacing(5)}px` }}
				icon={
					<ClickableIcon src="/assets/icons/key_blue.svg" alt="key-icon" onClick={toggleHideText} />
				}
				value={password}
				onChange={({ target }) => onPasswordChange(target.value)}
			/>
			<Button type="submit" disabled={!username.length || !password.length}>
				{t('loginNow')}
			</Button>
			<A href="#">{t('forgotPassword')}</A>
			<P>{t('or')}</P>
			<Button color="black" backgroundColor="white">
				{t('createAccount')}
			</Button>
		</form>
	)
}

export default SmallScreenLayoutLoginForm
