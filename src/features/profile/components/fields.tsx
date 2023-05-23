import {
	Image,
	Checkbox,
	CheckboxProps,
	PasswordInput,
	PasswordInputProps,
	TextInput,
	TextInputProps,
	Autocomplete,
	AutocompleteProps,
} from '@mantine/core'
import { IMAGE_MIME_TYPE, PDF_MIME_TYPE } from '@mantine/dropzone'
import { DateInput, DateInputProps } from '@mantine/dates'

import Link from 'next/link'

import { useTranslation } from 'next-i18next'

import { Dropzone, DropzoneProps } from '@mantine/dropzone'

import { useNationalities } from '../hooks/useNationalities'
import { useAddress } from '../hooks/useAddress'
import { useRef } from 'react'
import styled from 'styled-components'
import { selectColor, selectFont, selectSpacing } from '@/utils/themeUtils'

export const InputPassword: React.FC<Omit<PasswordInputProps, 'label'>> = (props) => {
	const { t } = useTranslation('common', { keyPrefix: 'inputFields' })
	return <PasswordInput label={t('password')} {...props} />
}

export const InputName: React.FC<Omit<TextInputProps, 'label'>> = (props) => {
	const { t } = useTranslation('common', { keyPrefix: 'inputFields' })
	return <TextInput label={t('name')} {...props} />
}

export const InputEmail: React.FC<Omit<TextInputProps, 'label'>> = (props) => {
	const { t } = useTranslation('common', { keyPrefix: 'inputFields' })
	return <TextInput label={t('email')} {...props} />
}

export const InputBirthday: React.FC<Omit<DateInputProps, 'label'>> = (props) => {
	const { t } = useTranslation('common', { keyPrefix: 'inputFields' })
	return <DateInput label={t('birthday')} {...props} />
}

export const InputNationality: React.FC<Omit<AutocompleteProps, 'data' | 'label'>> = (props) => {
	const { t } = useTranslation('common', { keyPrefix: 'inputFields' })

	const nationalities = (useNationalities()?.data ?? []).map((nationality) => ({
		value: nationality,
		group: nationality[0].toUpperCase(),
	}))
	return <Autocomplete label={t('nationality')} data={nationalities} {...props} />
}

export const InputAddress: React.FC<
	Omit<AutocompleteProps, 'data' | 'ref' | 'initalOpened' | 'limit' | 'label'>
> = (props) => {
	const { t } = useTranslation('common', { keyPrefix: 'inputFields' })
	const ref = useRef<HTMLInputElement>(null!)
	const addresses = (useAddress(ref.current?.value ?? '')?.data ?? []).map((a, i) => ({
		value: a.display_name,
		key: `${i}-${a.osm_id}`,
	}))
	return (
		<Autocomplete
			label={t('address')}
			ref={ref}
			initiallyOpened
			limit={5}
			data={addresses}
			{...props}
		/>
	)
}

const Inner = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 4px;
	height: 126px;
	${selectFont('campton')};
	color: ${selectColor('darkGray')};

	button {
		background-color: ${selectColor('black')};
		color: ${selectColor('white')};
		${selectFont('body')};
		border-radius: ${selectSpacing(0.5)}px;
		border: solid 1px ${selectColor('white')};
		:active {
			transform: translateY(-1%);
		}
		width: 184px;
		height: 36px;
		padding-top: ${selectSpacing(0.4)}px;
	}
`
export const InputIdFle: React.FC<
	Omit<
		DropzoneProps,
		'children' | 'label' | 'accept' | 'icon' | 'helperText' | 'buttonLabel' | 'onReject'
	>
> = (props) => {
	const { t } = useTranslation('common', { keyPrefix: 'inputFields' })
	return (
		<Dropzone
			accept={[...IMAGE_MIME_TYPE, ...PDF_MIME_TYPE]}
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
			{...props}
		>
			<Inner>
				<Image
					src="/assets/icons/uploadfile_light_gray.svg"
					alt="upload file icon"
					height={42}
					width={42}
				/>
				<p>{t('uploadID.helperText')}</p>
				<button>{t('uploadID.buttonLabel')}</button>
			</Inner>
		</Dropzone>
	)
}

const CheckBoxLabel = styled.span`
	${selectFont('camptonSm')};
	color: ${selectColor('darkGray')};

	position: relative;
	top: ${selectSpacing(0.4)}px;
	a {
		color: ${selectColor('blue')};
		text-decoration: none;
	}
`

export const TermsAndConditionsCheckbox: React.FC<CheckboxProps> = (props) => {
	const { t } = useTranslation('common', { keyPrefix: 'inputFields.termsAndCondtions' })
	return (
		<Checkbox
			color={'dark'}
			label={
				<CheckBoxLabel>
					{t('read')}{' '}
					<Link href="#" target="_blank">
						{t('termsAndConditions')}
					</Link>{' '}
					{t('andSignup')}
				</CheckBoxLabel>
			}
			{...props}
		/>
	)
}

export const MakePublicCheckbox: React.FC<CheckboxProps> = (props) => {
	const { t } = useTranslation('common', { keyPrefix: 'inputFields' })
	return (
		<Checkbox color={'dark'} label={<CheckBoxLabel>{t('makePublic')}</CheckBoxLabel>} {...props} />
	)
}
