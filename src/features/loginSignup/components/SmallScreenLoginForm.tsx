import { selectColor, selectFont, selectSpacing } from '@/utils/themeUtils'

import { Color } from '@/config/theme'
import { Image, ActionIcon } from '@mantine/core'

import Link from 'next/link'
import styled from 'styled-components'
import { LoginForm } from '../hooks/useLogin'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import InputField from '@/ui/primitive/InputField'

const Base = styled.form`
	margin-top: ${selectSpacing(3)}px;
`

const A = styled(Link)`
	${selectFont('camptonMd')};
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

const SmallScreenLoginForm: React.FC<{ loginForm: LoginForm }> = ({ loginForm }) => {
	const { t } = useTranslation('common', { keyPrefix: 'profile.loginForm' })

	const { onSubmit, form } = loginForm

	const [hideText, setHideText] = useState(true)
	const toggleHideText = () => setHideText((prev) => !prev)

	return (
		<Base onSubmit={onSubmit}>
			<InputField
				label={t('username')}
				icon={
					<ActionIcon size={20} radius="md" disabled>
						<Image src="/assets/icons/user_blue.svg" alt="user-icon" />
					</ActionIcon>
				}
				{...form.getInputProps('username')}
				required
				errorcolor="darkOrange"
			/>

			<InputField
				type={hideText ? 'password' : 'text'}
				label={t('password')}
				sx={{ marginBottom: `${selectSpacing(5)}px` }}
				icon={
					<ActionIcon size={20} radius="md" onClick={toggleHideText}>
						<Image src="/assets/icons/key_blue.svg" alt="key-icon" />
					</ActionIcon>
				}
				{...form.getInputProps('password')}
				required
				errorcolor="darkOrange"
			/>
			<Button type="submit" disabled={!form.values.username.length || !form.values.password.length}>
				{t('loginNow')}
			</Button>
			<A href="#">{t('forgotPassword')}</A>
			<P>{t('or')}</P>
			<Link href="/profile/signup" passHref>
				<Button color="black" backgroundColor="white">
					{t('helperText')}
				</Button>
			</Link>
		</Base>
	)
}

export default SmallScreenLoginForm
