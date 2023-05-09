import { FileWithPath } from '@mantine/dropzone'
import { UseFormReturnType, useForm } from '@mantine/form'
import dayjs from 'dayjs'
import React from 'react'
import { useAddress } from './useAddress'
import { useNationalities } from './useNationalities'

export type SignupFormFields = {
	firstName: string
	lastName: string
	email: string
	birthday: Date
	nationality: string
	address: string
	idFile: FileWithPath[]
	readTerms: boolean
	makePublic: boolean
}

export type SignupForm = {
	form: UseFormReturnType<SignupFormFields>
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
	nationalities: { value: string; group: string }[]
	addresses: { value: string; key: string }[]
}

const initialValues: SignupFormFields = {
	firstName: '',
	lastName: '',
	email: '',
	birthday: new Date(),
	nationality: '',
	address: '',
	idFile: [],
	readTerms: false,
	makePublic: true,
}

function isAtLeast18YearsOld(date: Date) {
	const inputDate = dayjs(date) // Adjust the format if your input date format is different

	if (!inputDate.isValid()) return false // Invalid date

	const eighteenYearsAgo = dayjs().subtract(18, 'year')

	return inputDate.isBefore(eighteenYearsAgo, 'day')
}

export const useSignup = (): SignupForm => {
	const { data: nationalities } = useNationalities()

	const form = useForm<SignupFormFields>({
		initialValues,

		validate: {
			firstName: (value) => (value.length < 2 ? 'First name must have at least 2 letters' : null),
			lastName: (value) => (value.length < 2 ? 'Last name must have at least 2 letters' : null),
			email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
			birthday: (value) =>
				!value
					? 'please enter you birthday'
					: isAtLeast18YearsOld(value)
					? null
					: 'You must be at least 18 years old, sorry.',
			nationality: (value) =>
				!(nationalities ?? []).includes(value) ? 'Please choose a valid nationality' : null,
			// address: (value) => (!value ? 'Please enter your place of residence' : null),
			readTerms: (value) => (!value ? 'Please read the terms and condition and approve' : null),
		},
	})

	const { data: addresses } = useAddress(form.values.address)

	const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		form.validate()
		console.log(form.errors)
		form.onSubmit(
			(values, e) => {
				console.log(values, e)
			},
			(errors, values) => {
				console.log(errors, values)
			},
		)

		e.preventDefault()
		if (form.isValid()) console.log('signup clicked', form.values)
	}

	return {
		form,
		onSubmit,
		nationalities: (nationalities ?? []).map((nationality) => ({
			value: nationality,
			group: nationality[0].toUpperCase(),
		})),
		addresses: (addresses ?? []).map((a, i) => ({
			value: a.display_name,
			key: `${i}-${a.osm_id}`,
		})),
	}
}
