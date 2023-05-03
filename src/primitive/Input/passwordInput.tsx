import React, { useState } from 'react'
import { BaseInput } from '@/primitive/Input/BaseInput'
import type { InputProps } from '@/primitive/Input/BaseInput'
import { Image } from '@mantine/core'
import styled from 'styled-components'

const Icon = styled(Image).attrs({
	src: '/assets/icons/key.svg',
	alt: 'key-icon',
	draggable: false,
})`
	cursor: pointer;

	:active {
		transform: translateY(-5%);
	}
`

export type PasswordInputProps = Omit<InputProps, 'icon' | 'type'>

export const PasswordInput: React.FC<PasswordInputProps> = (props) => {
	const [hideText, setHideText] = useState(true)
	const onClick = () => setHideText((prev) => !prev)
	return (
		<BaseInput type={hideText ? 'password' : 'text'} icon={<Icon onClick={onClick} />} {...props} />
	)
}
