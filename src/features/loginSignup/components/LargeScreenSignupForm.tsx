import { ActionIcon, Image } from '@mantine/core'

import { selectColor, selectFont, selectSpacing } from '@/utils/themeUtils'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'

import Link from 'next/link'
import { SignupForm } from '../hooks/useSignup'
import Dropzone from '@/ui/primitive/Dropzone'
import { IMAGE_MIME_TYPE, PDF_MIME_TYPE } from '@mantine/dropzone'
import Checkbox from '@/ui/primitive/Checkbox'
import { Color } from '@/config/theme'

import InputField from '@/ui/primitive/InputField'
import DateField from '@/ui/primitive/DateField'
import AutocompleteField from '@/ui/primitive/AutocompleteField'

const Base = styled.div`
	margin: auto;
	display: flex;
	flex-direction: column;
	align-items: stretch;

	width: 100%;
	height: 100%;
`
const Header = styled.div`
	display: grid;
	grid-template-columns: auto 1fr;
	grid-template-rows: auto auto;
	gap: ${selectSpacing(2)}px;
	color: ${selectColor('white')};
	width: 100%;
	margin-bottom: ${selectSpacing(5)}px;
`
const IconContainer = styled.div`
	border: solid 1px ${selectColor('blue')};
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
	color: ${selectColor('black')};
`

const Subtitle = styled.p`
	${selectFont('camptonMd')};
	color: ${selectColor('blue')};
	position: relative;
	bottom: ${selectSpacing(0.5)}px;
`

const Button = styled.button<{ backgroundColor?: Color; bordercolor?: Color; color?: Color }>`
	width: 167px;
	height: 51px;
	background-color: ${({ backgroundColor = 'black' }) => selectColor(backgroundColor)};
	color: ${({ color = 'white' }) => selectColor(color)};
	${selectFont('body')};
	border-radius: ${selectSpacing(1)}px;
	border: solid 1px ${({ color = 'white' }) => selectColor(color)};
	:active {
		transform: translateY(-1%);
	}
`
const A = styled(Link)`
	${selectFont('camptonMd')}
	color: ${selectColor('blue')};
	text-decoration: underline;
`

const Row = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	gap: ${selectSpacing(3.25)}px;
`

const StyledInputField = styled(InputField).attrs({
	bordercolor: 'lightGray',
	backgroundcolor: 'bgWhite',
})`
	width: 100%;
`

const P = styled.p`
	${selectFont('camptonMd')};
	color: ${selectColor('darkGray')};
	vertical-align: middle;
	padding: ${selectSpacing(3)}px 0;
`

const FooterText = styled.p`
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

const LargeScreenSignupForm: React.FC<{ signupForm: SignupForm }> = ({ signupForm }) => {
	const { t } = useTranslation('common', { keyPrefix: 'profile.signupForm' })
	const { form, onSubmit, nationalities, addresses } = signupForm

	return (
		<Base>
			<Header>
				<IconContainer>
					<Image src="/assets/icons/register.svg" alt="login-icon" width={48} height={48} />
				</IconContainer>
				<Title>{t('title')}</Title>
				<Subtitle>{t('welcome')}</Subtitle>
			</Header>
			<form onSubmit={onSubmit}>
				<Row>
					<StyledInputField label={t('firstName')} {...form.getInputProps('firstName')} required />
					<StyledInputField label={t('lastName')} {...form.getInputProps('lastName')} required />
				</Row>
				<StyledInputField label={t('email')} {...form.getInputProps('email')} required />
				<Row>
					<DateField
						label={t('birthday')}
						{...form.getInputProps('birthday')}
						required
						backgroundcolor="bgWhite"
						bordercolor="lightGray"
						icon={
							<ActionIcon disabled size={16}>
								<Image src="/assets/icons/calendar_merun_light.svg" alt="calendar icon" />
							</ActionIcon>
						}
						sx={{ width: '100%' }}
					/>
					<AutocompleteField
						hoverOnSearchChange
						label={t('nationality')}
						{...form.getInputProps('nationality')}
						data={nationalities}
						backgroundcolor="bgWhite"
						bordercolor="lightGray"
						sx={{ width: '100%' }}
					/>
				</Row>
				<Row>
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
						height="93px"
						icon={
							<Image
								src="/assets/icons/uploadfile_blue.svg"
								alt="upload file icon"
								height={24}
								width={24}
							/>
						}
						bordercolor="lightGray"
						helperText={t('uploadID.helperText')}
						customButton={<A href="">{t('uploadID.buttonLabel')}</A>}
						sx={{ marginTop: `${selectSpacing(3)}px` }}
					/>

					<AutocompleteField
						label={t('address')}
						hoverOnSearchChange
						initiallyOpened
						limit={5}
						{...form.getInputProps('address')}
						data={addresses}
						backgroundcolor="bgWhite"
						bordercolor="lightGray"
						sx={{ width: '100%' }}
					/>
				</Row>
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
					required
					pt={20}
				/>
				<Checkbox
					label={t('makePublic')}
					{...form.getInputProps('makePublic', { type: 'checkbox' })}
					py={20}
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
			</form>
		</Base>
	)
}

export default LargeScreenSignupForm
