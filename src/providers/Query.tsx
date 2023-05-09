import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import dynamic from 'next/dynamic'
import { useEffect, useState, Suspense } from 'react'
const ReactQueryDevtoolsProduction = dynamic(() =>
	import('@tanstack/react-query-devtools/build/lib/index.prod.js').then((d) => ({
		default: d.ReactQueryDevtools,
	})),
)
// Create a client
const queryClient = new QueryClient()

const QueryProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	const [showDevtools, setShowDevtools] = useState(false)

	useEffect(() => {
		// @ts-ignore
		window.toggleDevtools = () => setShowDevtools((old) => !old)
	}, [])

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
			{showDevtools ? (
				<Suspense fallback={null}>
					<ReactQueryDevtoolsProduction />
				</Suspense>
			) : null}
		</QueryClientProvider>
	)
}

export default QueryProvider
