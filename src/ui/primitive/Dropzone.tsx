import { selectColor, selectFont, selectSpacing } from '@/utils/themeUtils'

import { Color } from '@/config/theme'

import {
	Dropzone as MantineDropzone,
	DropzoneProps as MantineDropzoneProps,
} from '@mantine/dropzone'

import styled from 'styled-components'

const Base = styled(MantineDropzone)<{ backgroundColor?: Color; bordercolor?: Color }>`
	border: solid 1px;
	border-radius: ${selectSpacing(1)}px;
	border-color: ${({ bordercolor = 'black' }) => selectColor(bordercolor)};
	background-color: ${({ backgroundColor }) =>
		backgroundColor ? selectColor(backgroundColor) : 'transparent'};

	width: 100%;
`
type ButtonProps = { backgroundColor?: Color; bordercolor?: Color; color?: Color }
const Button = styled.button<ButtonProps>`
	width: 100%;
	height: 64px;
	background-color: ${({ backgroundColor = 'black' }) => selectColor(backgroundColor)};
	color: ${({ color = 'white' }) => selectColor(color)};
	${selectFont('body')};
	border-radius: ${selectSpacing(1)}px;
	border: solid 1px ${({ color = 'white' }) => selectColor(color)};
	:active {
		transform: translateY(-1%);
	}
`

const Inner = styled.div<{ color?: Color; height?: React.CSSProperties['height'] }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 4px;
	height: ${({ height }) => height};
	${selectFont('campton')};
	color: ${({ color = 'darkGray' }) => selectColor(color)};

	button {
		width: 184px;
		height: 36px;
		padding-top: ${selectSpacing(0.4)}px;
	}
`

type DropzoneProps = Omit<MantineDropzoneProps, 'children'> & {
	icon?: React.ReactNode
	helperText?: string
	buttonLabel?: string
	bordercolor?: Color
	color?: Color
	buttonProps?: ButtonProps
	customButton?: React.ReactNode
	height?: React.CSSProperties['height']
}

const Dropzone: React.FC<DropzoneProps> = ({
	icon,
	helperText,
	buttonLabel,
	bordercolor,
	color,
	buttonProps,
	customButton,
	height,
	...props
}) => (
	<Base {...props} bordercolor={bordercolor}>
		<Inner color={color} height={height}>
			{icon ? icon : null}
			{helperText ? <p>{helperText}</p> : null}
			{customButton ?? <Button {...buttonProps}>{buttonLabel ?? 'Click to upload'}</Button>}
		</Inner>
	</Base>
)

export default Dropzone
