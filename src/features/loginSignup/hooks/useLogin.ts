import { UseFormReturnType, useForm } from '@mantine/form'
import { values } from 'lodash'
import React from 'react'

export type LoginFormFields = {
	username: string
	password: string
}

export type LoginForm = {
	form: UseFormReturnType<LoginFormFields>
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const initialValues = {
	username: '',
	password: '',
}

export const useLogin = () => {
	const form = useForm<LoginFormFields>({
		initialValues,

		validate: {
			username: (value) => (value.length < 4 ? 'Username must have at least 4 letters' : null),
			password: (value) => (!value.length ? 'Please enter password' : null),
		},
	})

	const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		form.validate()
		// console.log(form.errors)
		form.onSubmit(
			(values, e) => {
				console.log(values, e)
			},
			(errors, values) => {
				console.log(errors, values)
			},
		)

		e.preventDefault()
		if (form.isValid()) console.log('login', form.values.username)
	}

	return { form, onSubmit }
}
