import { useForm } from '@mantine/form'
import { Paper, Button, Stack } from '@mantine/core'
import {
	InputEmail,
	InputName,
	InputBirthday,
	InputNationality,
	InputAddress,
	InputIdFle,
	TermsAndConditionsCheckbox,
	MakePublicCheckbox,
} from './fields'
import styled from 'styled-components'
import { selectSpacing, selectFont, selectColor } from '@/utils/themeUtils'

import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import type { FileWithPath } from '@mantine/dropzone'
import { useNationalities } from '../hooks/useNationalities'

type SignupFormFields = {
	name: string
	email: string
	birthday: Date | null
	nationality: string
	address: string
	idFile: FileWithPath[]
	readTerms: boolean
	makePublic: boolean
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
	color: ${selectColor('blue')};
	text-decoration: none;
`

const ClaimIdentity = styled.p`
	padding: ${selectSpacing(3)}px 0;
	${selectFont('camptonMd')};
	color: ${selectColor('darkGray')};
	text-align: center;
	a {
		${selectFont('bodyMd')};
		color: ${selectColor('blue')};
		text-decoration: none;
		display: block;
	}
`

const SignupForm: React.FC = () => {
	const { t } = useTranslation('common', { keyPrefix: 'profile.signupForm' })
	const { data: nationalities } = useNationalities()

	const form = useForm<SignupFormFields>({
		initialValues: {
			name: '',
			email: '',
			birthday: null,
			nationality: '',
			address: '',
			idFile: [],
			readTerms: false,
			makePublic: true,
		},

		validate: {
			name: (value) => (value.length < 2 ? 'First name must have at least 2 letters' : null),
			email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
			nationality: (value) =>
				!(nationalities ?? []).includes(value) ? 'Please choose a valid nationality' : null,
			readTerms: (value) => (!value ? 'Please read the terms and condition and approve' : null),
		},
	})

	return (
		<Paper radius="md" py="sm" px="xl" withBorder>
			<Title>{t('title')}</Title>
			<SubTitle>{t('subtitle')}</SubTitle>
			<form
				onSubmit={form.onSubmit(
					(values) => {
						console.log('signup', values)
					},
					(errors) => console.error(errors),
				)}
			>
				<Stack>
					<InputName {...form.getInputProps('name')} withAsterisk />
					<InputEmail {...form.getInputProps('email')} withAsterisk />

					<InputBirthday {...form.getInputProps('birthday')} />
					<InputNationality {...form.getInputProps('nationality')} withAsterisk />

					<InputIdFle onDrop={(files) => form.setFieldValue('idFile', files)} />
					<InputAddress {...form.getInputProps('address')} />

					<TermsAndConditionsCheckbox {...form.getInputProps('readTerms', { type: 'checkbox' })} />
					<MakePublicCheckbox {...form.getInputProps('makePublic', { type: 'checkbox' })} />
				</Stack>

				<Button fullWidth type="submit" mt={'lg'}>
					{t('buttonLabel')}
				</Button>
			</form>

			<ClaimIdentity>
				{t('cliamIdentity.text')}
				<Link href={`mailto:${t('cliamIdentity.email')}`}>{t('cliamIdentity.email')}</Link>
			</ClaimIdentity>
		</Paper>
	)
}

export default SignupForm
