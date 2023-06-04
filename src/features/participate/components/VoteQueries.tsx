import { createStyles, rem, Text } from '@mantine/core'
import { useListState } from '@mantine/hooks'
import {
	DragDropContext,
	Droppable,
	Draggable,
	DraggableProvided,
	DroppableProvided,
} from 'react-beautiful-dnd'
import { IconGripVertical } from '@tabler/icons-react'

const useStyles = createStyles((theme) => ({
	item: {
		display: 'flex',
		alignItems: 'center',
		borderRadius: theme.radius.md,
		border: `${rem(1)} solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
		}`,
		padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
		paddingLeft: `calc(${theme.spacing.xl} - ${theme.spacing.md})`, // to offset drag handle
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
		marginBottom: theme.spacing.sm,
	},

	itemDragging: {
		boxShadow: theme.shadows.sm,
	},

	symbol: {
		fontSize: rem(30),
		fontWeight: 700,
		width: rem(60),
	},

	dragHandle: {
		...theme.fn.focusStyles(),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
		color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
		paddingLeft: theme.spacing.md,
		paddingRight: theme.spacing.md,
	},
}))

interface DndListHandleProps {
	data: {
		position: number
		mass: number
		symbol: string
		name: string
	}[]
}

export function DndListHandle({ data }: DndListHandleProps) {
	const { classes, cx } = useStyles()
	const [state, handlers] = useListState(data)

	return (
		<DragDropContext
			onDragEnd={({ destination, source }) =>
				handlers.reorder({ from: source.index, to: destination?.index || 0 })
			}
		>
			<Droppable droppableId="dnd-list" direction="vertical">
				{(provided) => (
					<div {...provided.droppableProps} ref={provided.innerRef}>
						{state.map((item, index) => (
							<Draggable key={item.symbol} index={index} draggableId={item.symbol}>
								{(provided, snapshot) => (
									<div
										className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
										ref={provided.innerRef}
										{...provided.draggableProps}
									>
										<div {...provided.dragHandleProps} className={classes.dragHandle}>
											<IconGripVertical size="1.05rem" stroke={1.5} />
										</div>
										<Text className={classes.symbol}>{item.symbol}</Text>
										<div>
											<Text>{item.name}</Text>
											<Text color="dimmed" size="sm">
												Position: {item.position} • Mass: {item.mass}
											</Text>
										</div>
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	)
}
import React, { useState } from 'react'

import { DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd'

type Item = Required<{ id: string; content: string }>
// fake data generator
const getItems = (count: number, offset = 0): Item[] =>
	Array.from({ length: count }, (v, k) => k).map((k) => ({
		id: `item-${k + offset}-${new Date().getTime()}`,
		content: `item ${k + offset}`,
	}))

type Reorder<T = Item> = (list: T[], startIndex: number, endIndex: number) => T[]
const reorder: Reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list)
	const [removed] = result.splice(startIndex, 1)
	result.splice(endIndex, 0, removed)

	return result
}

/**
 * Moves an item from one list to another list.
 */
type Move<T = Item> = (
	source: T[],
	destination: T[],
	droppableSource: { index: number; droppableId: string | number },
	droppableDestination: { index: number; droppableId: string | number },
) => { [key: string]: T[] }
const move: Move = (source, destination, droppableSource, droppableDestination) => {
	const sourceClone = Array.from(source)
	const destClone = Array.from(destination)
	const [removed] = sourceClone.splice(droppableSource.index, 1)

	destClone.splice(droppableDestination.index, 0, removed)

	const result: { [key: string]: typeof sourceClone | typeof destClone } = {}
	result[droppableSource.droppableId] = sourceClone
	result[droppableDestination.droppableId] = destClone

	return result
}
const grid = 8

const getItemStyle = (
	isDragging: boolean,
	draggableStyle?: DraggingStyle | NotDraggingStyle,
): React.CSSProperties => ({
	// some basic styles to make the items look a bit nicer
	userSelect: 'none',
	padding: grid * 2,
	margin: `0 0 ${grid}px 0`,

	// change background colour if dragging
	background: isDragging ? 'lightgreen' : 'grey',

	// styles we need to apply on draggables
	...draggableStyle,
})
const getListStyle = (isDraggingOver: boolean) => ({
	background: isDraggingOver ? 'lightblue' : 'lightgrey',
	padding: grid,
	width: 250,
})

export function QuoteApp() {
	const [state, setState] = useState([getItems(10), getItems(5, 10)])

	function onDragEnd(result: Required<{ source: any; destination: any }>) {
		const { source, destination } = result

		// dropped outside the list
		if (!destination) return

		const sInd = +source.droppableId
		const dInd = +destination.droppableId

		if (sInd === dInd)
			setState((prev) => {
				const items = reorder(prev[sInd], source.index, destination.index)
				const newState = [...prev]
				newState[sInd] = items
				return newState
			})
		else
			setState((prev) => {
				const result = move(prev[sInd], prev[dInd], source, destination)
				const newState = [...prev]
				newState[sInd] = result[sInd]
				newState[dInd] = result[dInd]

				return newState.filter((group) => group.length)
			})
	}

	return (
		<div>
			<button
				type="button"
				onClick={() => {
					setState([...state, []])
				}}
			>
				Add new group
			</button>
			<button
				type="button"
				onClick={() => {
					setState([...state, getItems(1)])
				}}
			>
				Add new item
			</button>
			<div style={{ display: 'flex' }}>
				<DragDropContext onDragEnd={onDragEnd}>
					{state.map((el, ind) => (
						<Droppable key={ind} droppableId={`${ind}`}>
							{(provided, snapshot) => (
								<div
									ref={provided.innerRef}
									style={getListStyle(snapshot.isDraggingOver)}
									{...provided.droppableProps}
								>
									{el.map((item, index) => (
										<Draggable key={item.id} draggableId={item.id} index={index}>
											{(provided, snapshot) => (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
												>
													<div
														style={{
															display: 'flex',
															justifyContent: 'space-around',
														}}
													>
														{item.content}
														<button
															type="button"
															onClick={() => {
																const newState = [...state]
																newState[ind].splice(index, 1)
																setState(newState.filter((group) => group.length))
															}}
														>
															delete
														</button>
													</div>
												</div>
											)}
										</Draggable>
									))}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					))}
				</DragDropContext>
			</div>
		</div>
	)
}
