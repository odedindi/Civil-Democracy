import { selectColor, selectFont, selectSpacing } from '@/utils/themeUtils'

import { Color } from '@/config/theme'
import { ActionIcon, Image } from '@mantine/core'
import { IMAGE_MIME_TYPE, PDF_MIME_TYPE } from '@mantine/dropzone'

import Dropzone from '@/ui/primitive/Dropzone'
import Link from 'next/link'
import styled from 'styled-components'
import { SignupForm } from '../hooks/useSignup'
import Checkbox from '@/ui/primitive/Checkbox'
import { useTranslation } from 'next-i18next'

import InputField from '@/ui/primitive/InputField'
import DateField from '@/ui/primitive/DateField'
import AutocompleteField from '@/ui/primitive/AutocompleteField'

const Base = styled.form`
	display: flex;
	flex-direction: column;
	padding: ${selectSpacing(3.25)}px 0;
`

const A = styled(Link)`
	${selectFont('camptonMd')};
	color: ${selectColor('black')};
	text-decoration: none;
`
const P = styled.p`
	${selectFont('camptonMd')};
	color: ${selectColor('darkGray')};
	text-align: center;
	vertical-align: middle;
`
const Button = styled.button<{ backgroundColor?: Color; bordercolor?: Color; color?: Color }>`
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

	margin: ${selectSpacing(3)}px 0;
`

const FooterText = styled.p`
	${selectFont('camptonXs')};
	color: ${selectColor('darkGray')};
	text-align: center;

	margin-top: ${selectSpacing(3)}px;
	a {
		${selectFont('bodySm')};
		color: ${selectColor('blue')};
		text-decoration: none;
		display: block;
	}
`
const SmallScreenSignupForm: React.FC<{ signupForm: SignupForm }> = ({ signupForm }) => {
	const { t } = useTranslation('common', { keyPrefix: 'profile.signupForm' })

	const { form, onSubmit, nationalities, addresses } = signupForm

	return (
		<Base onSubmit={onSubmit}>
			<InputField label={t('firstName')} {...form.getInputProps('firstName')} required />

			<InputField label={t('lastName')} {...form.getInputProps('lastName')} required />
			<InputField label={t('email')} {...form.getInputProps('email')} required />
			<DateField
				label={t('birthday')}
				{...form.getInputProps('birthday')}
				required
				icon={
					<ActionIcon disabled size={16}>
						<Image src="/assets/icons/calendar_blue.svg" alt="calendar icon" />
					</ActionIcon>
				}
			/>
			<AutocompleteField
				hoverOnSearchChange
				label={t('nationality')}
				{...form.getInputProps('nationality')}
				data={nationalities}
			/>

			<AutocompleteField
				label={t('address')}
				hoverOnSearchChange
				initiallyOpened
				limit={5}
				{...form.getInputProps('address')}
				data={addresses}
			/>

			<Dropzone
				accept={[...IMAGE_MIME_TYPE, ...PDF_MIME_TYPE]}
				onDrop={(files) => form.setFieldValue('idFile', files)}
				onReject={(files) => {
					files.forEach(({ errors, file }) => {
						errors.forEach(({ code, message }) =>
							console.error(
								`Error "${file.name}" ${code}: ${message
									.replaceAll('image/', '')
									.replaceAll('application/', '')}
									`,
							),
						)
					})
				}}
				height="126px"
				icon={
					<Image
						src="/assets/icons/uploadfile_light_gray.svg"
						alt="upload file icon"
						height={42}
						width={42}
					/>
				}
				helperText={t('uploadID.helperText')}
				buttonLabel={t('uploadID.buttonLabel')}
				sx={{ margin: `${selectSpacing(3)}px 0` }}
			/>

			<Checkbox
				label={
					<>
						{t('read')}{' '}
						<Link href="#" target="_blank">
							{t('termsAndConditions')}
						</Link>{' '}
						{t('andSignup')}
					</>
				}
				{...form.getInputProps('readTerms', { type: 'checkbox' })}
			/>
			<Checkbox
				label={t('makePublic')}
				{...form.getInputProps('makePublic', { type: 'checkbox' })}
				sx={{ margin: `${selectSpacing(1)}px 0` }}
			/>

			<Button type="submit" disabled={false}>
				{t('buttonLabel')}
			</Button>
			<P>
				{t('helperText')} <A href="/profile/login">{t('login')}</A>
			</P>
			<FooterText>
				{t('cliamIdentity')}
				<Link href={`mailto:${t('cliamIdentityEmailAddress')}`}>
					{t('cliamIdentityEmailAddress')}
				</Link>
			</FooterText>
		</Base>
	)
}

export default SmallScreenSignupForm
