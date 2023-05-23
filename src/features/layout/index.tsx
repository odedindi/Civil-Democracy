import { AppShell, Header as MantineHeader, Footer } from '@mantine/core'
import { PropsWithChildren, useState } from 'react'
import Header from './components/header'
import Navbar from './components/navbar'

const DashboardLayout: React.FC<PropsWithChildren> = ({ children }) => {
	const [openNavbar, setOpenNavbar] = useState(false)

	return (
		<AppShell
			padding="md"
			navbarOffsetBreakpoint="sm"
			styles={(theme) => ({ main: { backgroundColor: theme.colors.gray[0] } })}
			navbar={<Navbar hidden={!openNavbar} />}
			header={
				<MantineHeader height={{ base: 70 }} p="md">
					<Header openNavbar={openNavbar} toggleNavbar={() => setOpenNavbar((o) => !o)} />
				</MantineHeader>
			}
		>
			{children}
		</AppShell>
	)
}

export default DashboardLayout
