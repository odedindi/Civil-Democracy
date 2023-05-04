import React, { useState } from 'react'

export const useLogin = () => {
	const [username, onUsernameChange] = useState('')
	const [password, onPasswordChange] = useState('')

	const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault()
		if (!username.trim().length || !password.trim().length) return
		console.log('login clicked', username)
	}

	return { username, password, onUsernameChange, onPasswordChange, onSubmit }
}
