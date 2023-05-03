import { selectColor, selectFont, selectSpacing } from '@/utils/themeUtils'
import styled from 'styled-components'
import { useId } from '@mantine/hooks'
import React from 'react'

const Base = styled.div<{ width?: React.CSSProperties['width']; withIcon?: boolean }>`
	position: relative;

	input {
		width: ${({ width = '100%' }) => width};
		height: 56px;

		padding: ${selectSpacing(1.5)}px;
		padding-right: ${({ withIcon }) => (withIcon ? `${selectSpacing(5)}px` : undefined)};
		outline: none;
		border: 1px solid ${selectColor('white')};

		border-radius: ${selectSpacing(1)}px;
		background-color: ${selectColor('blue')};
		color: ${selectColor('white')};

		:-webkit-autofill,
		:-webkit-autofill:hover,
		:-webkit-autofill:focus,
		:-webkit-autofill:active {
			-webkit-box-shadow: 0 0 0 30px ${selectColor('blue')} inset !important;
			-webkit-text-fill-color: ${selectColor('white')};
		}
		::placeholder {
			color: #ffffff !important;
			outline-color: ${selectColor('white')} !important;
		}
	}

	label {
		position: absolute;
		left: 10px;
		transform: translateY(-50%);

		background: ${selectColor('blue')};
		padding: ${selectSpacing(1)}px;
		${selectFont('bodyMd')};
		color: ${selectColor('white')};
	}
`
const Icon = styled.span`
	padding: ${selectSpacing(0.5)}px;
	position: absolute;

	right: ${selectSpacing(1.5)}px;
	transform: translateY(50%);
`

export type InputProps = {
	label?: string
	icon?: React.ReactNode
} & React.InputHTMLAttributes<HTMLInputElement>

export const BaseInput: React.FC<InputProps> = ({
	icon,
	label,
	id,
	className,
	style,
	...inputProps
}) => {
	const uuid = useId(id)

	return (
		<Base className={className} style={style} withIcon={Boolean(icon)}>
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
