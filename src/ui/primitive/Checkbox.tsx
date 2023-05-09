import { selectColor, selectFont, selectSpacing } from '@/utils/themeUtils'

import { Checkbox as MantineCheckbox, CheckboxProps as MantineCheckboxProps } from '@mantine/core'
import styled from 'styled-components'

const CheckBoxLabel = styled.span`
	${selectFont('camptonSm')};
	color: ${selectColor('darkGray')};

	position: relative;
	top: ${selectSpacing(0.4)}px;
	a {
		color: ${selectColor('blue')};
		text-decoration: none;
	}
`

type CheckboxProps = MantineCheckboxProps

const Checkbox: React.FC<CheckboxProps> = ({ label, color, ...props }) => (
	<MantineCheckbox
		color={color ?? 'dark'}
		{...props}
		label={<CheckBoxLabel>{label}</CheckBoxLabel>}
	/>
)

export default Checkbox
