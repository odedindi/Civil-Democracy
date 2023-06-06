import { useListState } from '@mantine/hooks'
import { DragDropContext } from 'react-beautiful-dnd'

import styled from 'styled-components'

import { useEffect } from 'react'
import VoteQueriesItem from './VoteQueriesItem'
import StrictModeDroppable from '@/ui/StrictModeDroppable'
import { VoteQuery } from './types'

const Base = styled.div``

interface DndListHandleProps {
	queries: VoteQuery[]
}

const VoteQueries: React.FC<DndListHandleProps> = (props) => {
	const [queries, handlers] = useListState(props.queries)

	useEffect(() => {
		console.log('queries change', queries)
	}, [queries])

	return (
		<DragDropContext
			onDragEnd={({ destination, source }) => {
				handlers.reorder({ from: source.index, to: destination?.index || 0 })
			}}
		>
			<StrictModeDroppable droppableId="vote-quries-list" direction="vertical">
				{(provided) => (
					<Base {...provided.droppableProps} ref={provided.innerRef}>
						{queries?.map((query, index) => (
							<VoteQueriesItem index={index} query={query} key={query.id} />
						))}
						{provided.placeholder}
					</Base>
				)}
			</StrictModeDroppable>
		</DragDropContext>
	)
}

export default VoteQueries
