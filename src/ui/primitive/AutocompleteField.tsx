import {
	Autocomplete as MantineAutocomplete,
	AutocompleteProps as MantineAutocompleteProps,
} from '@mantine/core'

import { selectColor, selectFont, selectSpacing } from '@/utils/themeUtils'

import { Color } from '@/config/theme'

import styled from 'styled-components'

const Input = styled(MantineAutocomplete)<{
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

	.mantine-Autocomplete-rightSection {
		button {
			background: transparent;
			border: none;
		}
		left: ${({ theme: { dir } }) => (dir === 'ltr' ? 0 : undefined)};
		right: ${({ theme: { dir } }) => (dir === 'rtl' ? 0 : undefined)};
	}
	.mantine-Autocomplete-error {
		color: ${({ errorcolor = 'darkOrange' }) => selectColor(errorcolor)} !important;
		padding-inline-start: ${selectSpacing(1)}px;
	}
`
export type InputProps = Omit<MantineAutocompleteProps, 'rightSection'> & {
	color?: Color
	backgroundcolor?: Color
	bordercolor?: Color
	width?: React.CSSProperties['width']
	errorcolor?: Color
}
const AutocompleteField: React.FC<InputProps> = ({ icon, ...inputProps }) => (
	<Input rightSection={icon} {...inputProps} />
)

export default AutocompleteField
