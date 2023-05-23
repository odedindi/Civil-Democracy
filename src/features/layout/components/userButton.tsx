import { selectColor, selectSpacing } from '@/utils/themeUtils'
import { Group } from '@mantine/core'

import styled from 'styled-components'

import { Text, UnstyledButton } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'

import { UnstyledButtonProps, Avatar } from '@mantine/core'

const Base = styled(UnstyledButton)`
	display: block;
	width: 100%;
	padding: ${selectSpacing(2)}px;
	border-radius: ${selectSpacing(0.5)}px;

	:hover {
		background-color: ${selectColor('bgWhite')};
	}
`

interface UserButtonProps extends UnstyledButtonProps {
	image: string
	name: string
	email: string
	icon?: React.ReactNode
}

const Icon = styled(IconChevronRight).attrs({ size: `${selectSpacing(2)}px`, stroke: 1.5 })`
	transform: rotate(${({ theme: { dir } }) => (dir === 'rtl' ? 180 : 0)}deg);
`

const UserButton = ({ image, name, email, icon, ...others }: UserButtonProps) => {
	return (
		<Base {...others}>
			<Group>
				<Avatar src={image} radius="xl" />

				<div style={{ flex: 1 }}>
					<Text size="sm" weight={500}>
						{name}
					</Text>

					<Text color="dimmed" size="xs">
						{email}
					</Text>
				</div>

				<Icon />
			</Group>
		</Base>
	)
}

export default UserButton
