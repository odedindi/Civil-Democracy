import { Color } from '@/config/theme'
import { selectColor, selectFont, selectSpacing } from '@/utils/themeUtils'
import { Select as MantineSelect, SelectProps as MantineSelectProps } from '@mantine/core'
import styled from 'styled-components'

const Base = styled(MantineSelect)<{
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
		padding-inline-start: ${({ rightSection }) =>
			rightSection ? `${selectSpacing(4.5)}px` : undefined};

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
	}
	.mantine-Select-dropdown {
		background-color: ${({ backgroundcolor = 'white' }) => selectColor(backgroundcolor)} !important;
	}
	.mantine-Select-rightSection {
		button {
			background: transparent;
			border: none;
		}
		left: ${({ theme: { dir } }) => (dir === 'ltr' ? 0 : undefined)};
		right: ${({ theme: { dir } }) => (dir === 'rtl' ? 0 : undefined)};
	}
	.mantine-Select-error {
		color: ${({ errorcolor = 'darkOrange' }) => selectColor(errorcolor)} !important;
		padding-inline-start: ${selectSpacing(1)}px;
	}
`

type SelectProps = Omit<
	MantineSelectProps,
	'rightSection' | 'searchable' | 'nothingFound' | 'clearable' | 'transitionProps'
> & {
	color?: Color
	backgroundcolor?: Color
	bordercolor?: Color
	width?: React.CSSProperties['width']
	errorcolor?: Color
}

const Select: React.FC<SelectProps> = ({ icon, ...selectProps }) => (
	<Base
		rightSection={icon ?? <></>}
		searchable
		nothingFound="No options"
		clearable
		transitionProps={{ duration: 80, timingFunction: 'ease' }}
		{...selectProps}
	/>
)

export default Select
