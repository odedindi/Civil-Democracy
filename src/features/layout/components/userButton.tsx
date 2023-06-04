import { selectColor, selectSpacing } from '@/utils/themeUtils'
import { Group } from '@mantine/core'

import styled from 'styled-components'

import { Text } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'

import { Avatar } from '@mantine/core'
import Link from 'next/link'

const Base = styled(Link)`
	text-decoration: none;
	display: block;
	width: 100%;
	padding: ${selectSpacing(2)}px;
	border-radius: ${selectSpacing(0.5)}px;
	font-style: inherit;
	color: inherit;

	:hover {
		background-color: ${selectColor('bgWhite')};
	}
`

type UserButtonProps = {
	image: string
	name: string
	email: string
	id: string
}

const Icon = styled(IconChevronRight).attrs({ size: `${selectSpacing(2)}px`, stroke: 1.5 })`
	transform: rotate(${({ theme: { dir } }) => (dir === 'rtl' ? 180 : 0)}deg);
`

const UserButton = ({ image, name, email, id, ...others }: UserButtonProps) => {
	return (
		<Base {...others} href={`/profile/${id}`} passHref>
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
