import { useEffect, useState } from 'react'

const delay = 0.5 // seconds
export const useDidMount = () => {
	const [isMounted, setIsMounted] = useState<boolean>(false)

	useEffect(() => {
		const timer = setTimeout(() => setIsMounted(true), delay * 1000)
		return () => {
			clearTimeout(timer)
		}
	}, [isMounted])

	return isMounted
}
