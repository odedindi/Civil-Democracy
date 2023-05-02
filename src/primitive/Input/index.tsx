import React from 'react'
import { BaseInput } from '@/primitive/Input/BaseInput'
import type { InputProps } from '@/primitive/Input/BaseInput'
import { PasswordInput } from '@/primitive/Input/passwordInput'

const Input: React.FC<InputProps> = ({ icon, type, ...inputProps }) => {
	if (type === 'password') return <PasswordInput {...inputProps} />
	return <BaseInput icon={icon} type={type} {...inputProps} />
}

export default Input
