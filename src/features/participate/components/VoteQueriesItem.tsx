import { Avatar, Text, Title } from '@mantine/core'

import { Draggable } from 'react-beautiful-dnd'
import { IconGripVertical } from '@tabler/icons-react'
import styled from 'styled-components'
import { selectBoxShadow, selectColor, selectSpacing } from '@/utils/themeUtils'
import React from 'react'

import { VoteQuery } from './types'

const Base = styled.div<{ dragging?: 0 | 1 }>`
	display: flex;
	align-items: center;
	border-radius: ${selectSpacing(0.5)}px;
	border: solid ${selectSpacing(0.15)}px ${selectColor('gray')};
	padding: ${selectSpacing(1)}px ${selectSpacing(2.5)}px ${selectSpacing(1)}px
		${selectSpacing(1.5)}px;

	background-color: ${selectColor('white')};
	margin-bottom: ${selectSpacing(1)}px;
	transition: box-shadow 0.5s ease;
	box-shadow: ${({ dragging }) => (dragging ? selectBoxShadow('sm') : undefined)};
`

const DragHandler = styled.div<{ dragging?: 0 | 1 }>`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	color: ${selectColor('darkGray')};
	padding: 0 ${selectSpacing(1.5)}px;
	transition: cursor 0.5s ease;
	cursor: ${({ dragging }) => (dragging ? 'grabbing' : 'grab')};
`

interface VoteQueriesItemProps {
	index: number
	query: VoteQuery
}

const VoteQueriesItem: React.FC<VoteQueriesItemProps> = ({ query, index }) => {
	return (
		<Draggable index={index} draggableId={query.id}>
			{(provided, snapshot) => (
				<Base
					dragging={snapshot.isDragging ? 1 : 0}
					ref={provided.innerRef}
					{...provided.draggableProps}
				>
					<DragHandler {...provided.dragHandleProps}>
						<IconGripVertical size="1.05rem" stroke={1.5} />
					</DragHandler>
					<Title>{query.title}</Title>

					<div>
						<Text>{query.description.subtitle}</Text>
						<Text>{query.description.text}</Text>
						{query.proposedResolution?.map((res) => (
							<div key={res.title}>
								<Avatar src={res.avatar} />
								<Text color="dimmed" size="md">
									{res.title}
								</Text>
								<Text color="dimmed" size="sm">
									{res.description}
								</Text>
								{res.supporters?.map((supporter, i) => (
									<div key={`${i}-${supporter.name}`}>
										<Avatar src={supporter.avatar} />
										<Text>{supporter.name}</Text>
									</div>
								))}
							</div>
						))}
					</div>
				</Base>
			)}
		</Draggable>
	)
}
export default VoteQueriesItem
