import { useState, useEffect } from 'react'
import { DroppableProps, Droppable } from 'react-beautiful-dnd'

const StrictModeDroppable: React.FC<DroppableProps> = ({ children, ...droppableProps }) => {
	const [enabled, setEnabled] = useState(false)

	useEffect(() => {
		const animation = requestAnimationFrame(() => setEnabled(true))

		return () => {
			cancelAnimationFrame(animation)
			setEnabled(false)
		}
	}, [])

	if (!enabled) return null

	return <Droppable {...droppableProps}>{children}</Droppable>
}
export default StrictModeDroppable
