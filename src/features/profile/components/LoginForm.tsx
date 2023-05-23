import { useForm } from '@mantine/form'
import { Paper, Group, Button, Divider, Stack } from '@mantine/core'
import { GoogleButton, GithubButton } from './SocialButton'
import { InputEmail, InputPassword } from './fields'
import styled from 'styled-components'
import { selectSpacing, selectFont, selectColor } from '@/utils/themeUtils'

import { useTranslation } from 'next-i18next'
import Link from 'next/link'

type LoginFormFields = {
	email: string
	password: string
}

const Title = styled.h1`
	${selectFont('h2')}
	margin-bottom: ${selectSpacing(2)}px;
`

const SubTitle = styled.p`
	${selectFont('camptonMd')};
	color: ${selectColor('gray')};
	white-space: break-spaces;
`

const A = styled(Link)`
	${selectFont('camptonMd')};
	color: ${selectColor('gray')};
	text-decoration: none;
`

const LoginForm: React.FC = () => {
	const { t } = useTranslation('common', { keyPrefix: 'profile.loginForm' })
	const form = useForm<LoginFormFields>({
		initialValues: {
			email: '',
			password: '',
		},

		validate: {
			email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
			password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
		},
	})

	return (
		<>
			<Paper radius="md" p="xl" withBorder>
				<Title>{t('title')}</Title>
				<SubTitle>{t('subtitle')}</SubTitle>
				<Group grow mb="md" mt="md">
					<GoogleButton />
					<GithubButton />
				</Group>

				<Divider label={t('or')} labelPosition="center" my="lg" />

				<form
					onSubmit={form.onSubmit(
						(values) => {
							console.log('login', values)
						},
						(errors) => console.error(errors),
					)}
				>
					<Stack>
						<InputEmail {...form.getInputProps('email')} withAsterisk />
						<InputPassword {...form.getInputProps('password')} withAsterisk />
						<A href="reset-password">{t('forgotPassword')}</A>
					</Stack>

					<Button fullWidth type="submit" mt={'lg'}>
						{t('buttonLabel')}
					</Button>
				</form>
			</Paper>
		</>
	)
}

export default LoginForm
