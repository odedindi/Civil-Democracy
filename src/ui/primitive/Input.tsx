import { selectColor, selectFont, selectSpacing } from '@/utils/themeUtils'

import { Color } from '@/config/theme'
import React from 'react'
import styled from 'styled-components'
import { useId } from '@mantine/hooks'

const Base = styled.div<{
	color?: Color
	backgroundColor?: Color
	width?: React.CSSProperties['width']
	withIcon?: boolean
}>`
	position: relative;

	input {
		width: ${({ width = '100%' }) => width};
		height: 56px;

		padding: ${selectSpacing(1.5)}px;
		padding-inline-end: ${({ withIcon }) => (withIcon ? `${selectSpacing(5)}px` : undefined)};
		outline: none;
		border: 1px solid ${({ color = 'black' }) => selectColor(color)} !important;

		border-radius: ${selectSpacing(1)}px;
		background-color: ${({ backgroundColor = 'white' }) => selectColor(backgroundColor)} !important;
		color: ${({ color = 'black' }) => selectColor(color)} !important;

		:-webkit-autofill,
		:-webkit-autofill:hover,
		:-webkit-autofill:focus,
		:-webkit-autofill:active {
			-webkit-box-shadow: 0 0 0 30px
				${({ backgroundColor = 'white' }) => selectColor(backgroundColor)} inset !important;
			-webkit-text-fill-color: ${({ color = 'black' }) => selectColor(color)};
		}
		::placeholder {
			color: ${({ color = 'black' }) => selectColor(color)} !important;
			outline-color: ${({ color = 'black' }) => selectColor(color)} !important;
		}
	}

	label {
		position: absolute;

		left: ${({ theme: { dir } }) => (dir === 'ltr' ? `${selectSpacing(1.25)}px` : undefined)};
		right: ${({ theme: { dir } }) => (dir === 'rtl' ? `${selectSpacing(1.25)}px` : undefined)};
		transform: translateY(-50%);

		background: ${({ backgroundColor = 'white' }) => selectColor(backgroundColor)};
		padding: 0 ${selectSpacing(1)}px;
		${selectFont('bodyMd')};
		color: ${({ color = 'black' }) => selectColor(color)};
	}
`
const Icon = styled.span`
	padding: ${selectSpacing(0.5)}px;
	position: absolute;

	right: ${({ theme: { dir } }) => (dir === 'ltr' ? `${selectSpacing(1.5)}px` : undefined)};
	left: ${({ theme: { dir } }) => (dir === 'rtl' ? `${selectSpacing(1.5)}px` : undefined)};
	transform: translateY(50%);
`
export type InputProps = {
	label?: string
	icon?: React.ReactNode
	color?: Color
	backgroundColor?: Color
} & React.InputHTMLAttributes<HTMLInputElement>

export const Input: React.FC<InputProps> = ({
	icon,
	label,
	id,
	className,
	style,
	color,
	backgroundColor,
	...inputProps
}) => {
	const uuid = useId(id)

	return (
		<Base
			className={className}
			style={style}
			withIcon={Boolean(icon)}
			color={color}
			backgroundColor={backgroundColor}
		>
			<label htmlFor={uuid}>{label}</label>
			<input type={inputProps.type ?? 'text'} id={uuid} {...inputProps} />
			{icon ? (
				<Icon
					onDragStart={(e) => {
						return false
					}}
				>
					{icon}
				</Icon>
			) : null}
		</Base>
	)
}

export default Input
