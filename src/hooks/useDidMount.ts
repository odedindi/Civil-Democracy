import { useEffect, useState } from 'react'

export const useDidMount = () => {
	const [isMounted, setIsMounted] = useState<boolean>(false)

	useEffect(() => {
		setIsMounted(true)

		return () => {
			setIsMounted(false)
		}
	}, [isMounted])

	return isMounted
}
