import { selectColor, selectFont, selectSpacing, selectMinMediaQuery } from '@/utils/themeUtils'

import { Color } from '@/config/theme'
import { DateInput, DateInputProps } from '@mantine/dates'

import styled from 'styled-components'

const Base = styled(DateInput)<{
	color?: Color
	errorcolor?: Color
	backgroundcolor?: Color
	bordercolor?: Color
	width?: React.CSSProperties['width']
	rightSection?: React.ReactNode
}>`
	label {
		z-index: 2;
		position: relative;

		left: ${({ theme: { dir } }) => (dir === 'ltr' ? `${selectSpacing(3)}px` : undefined)};
		right: ${({ theme: { dir } }) => (dir === 'rtl' ? `${selectSpacing(3)}px` : undefined)};
		transform: translateY(50%) !important;

		background: ${({ backgroundcolor = 'white' }) => selectColor(backgroundcolor)};
		padding: 0 ${selectSpacing(1)}px;
		${selectFont('bodyMd')};
		color: ${({ color = 'black' }) => selectColor(color)};
		padding-inline-start: ${selectSpacing(1.5)}px;
	}

	input {
		z-index: 1;
		width: ${({ width = '100%' }) => width};
		height: 56px;
		padding: 0 calc(${selectSpacing(4.5)}px / 3);

		outline: none;
		border: 1px solid ${({ bordercolor = 'black' }) => selectColor(bordercolor)} !important;
		border-radius: ${selectSpacing(1)}px;

		background-color: ${({ backgroundcolor = 'white' }) => selectColor(backgroundcolor)} !important;
		color: ${({ color = 'black' }) => selectColor(color)} !important;
		text-align: inherit !important;

		:-webkit-autofill,
		:-webkit-autofill:hover,
		:-webkit-autofill:focus,
		:-webkit-autofill:active {
			-webkit-box-shadow: 0 0 0 30px
				${({ backgroundcolor = 'white' }) => selectColor(backgroundcolor)} inset !important;
			-webkit-text-fill-color: ${({ color = 'black' }) => selectColor(color)};
		}
		::placeholder {
			color: ${({ color = 'black' }) => selectColor(color)} !important;
			outline-color: ${({ color = 'black' }) => selectColor(color)} !important;
		}

		::-webkit-calendar-picker-indicator {
			background-image: url('/assets/icons/calendar_blue.svg');
			${selectMinMediaQuery('laptop')} {
				background-image: url('/assets/icons/calendar_marun_light.svg');
			}
		}
	}

	.mantine-DateInput-rightSection {
		button {
			background: transparent;
			border: none;
		}

		right: ${({ theme: { dir } }) => (dir === 'ltr' ? 0 : 'inherit')} !important;
		left: ${({ theme: { dir } }) => (dir === 'rtl' ? 0 : 'inherit')} !important;
	}

	.mantine-DateInput-error {
		color: ${({ errorcolor = 'darkOrange' }) => selectColor(errorcolor)} !important;
		padding-inline-start: ${selectSpacing(1)}px;
	}

	.mantine-DateInput-calendar {
		direction: ltr !important;
	}
`
export type InputProps = Omit<DateInputProps, 'rightSection'> & {
	color?: Color
	bordercolor?: Color
	backgroundcolor?: Color
	width?: React.CSSProperties['width']
	errorcolor?: Color
}
const DateField: React.FC<InputProps> = ({ icon, ...inputProps }) => (
	<Base rightSection={icon} {...inputProps} />
)

export default DateField
