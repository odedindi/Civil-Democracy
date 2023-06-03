import { selectColor, selectFont, selectSpacing } from '@/utils/themeUtils'
import { Navbar as MantineNavbar, Group, ScrollArea, Button } from '@mantine/core'

import { IconUsersGroup, IconShieldHalfFilled, IconHomeDollar } from '@tabler/icons-react'
import styled from 'styled-components'
import { useState } from 'react'
import { Box, Collapse, ThemeIcon, Text } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'

import { signOut, useSession } from 'next-auth/react'
import UserButton from './userButton'
import LanguagePicker from '@/ui/LanguagePicker'
import Link from 'next/link'

interface LinksGroupProps {
	icon: React.FC<any>
	label: string
	initiallyOpened?: boolean
	links?: { label: string; link: string }[]
}

const NavbarLinkContainer = styled.div`
	direction: ${({ theme: { dir } }) => dir};
	cursor: pointer;

	display: block;
	width: 100%;
	padding: ${selectSpacing(0.5)}px ${selectSpacing(1)}px;

	:hover {
		background-color: ${selectColor('bgWhite')};
		color: ${selectColor('black')};
	}
`

const NavbarLinkLabel = styled.div`
	margin-inline-start: ${selectSpacing(1)}px;
`

const NavbarLinkItem = styled(Text).attrs({ component: Link })`
	direction: ${({ theme: { dir } }) => dir};
	${selectFont('bodyMd')}
	display: 'block';
	text-decoration: 'none';
	padding: ${selectSpacing(0.5)}px ${selectSpacing(1)}px;
	padding-inline-start: ${selectSpacing(2)}px;

	margin-inline-start: ${selectSpacing(3)}px;
	border-inline-start: ${selectSpacing(0.125)}px solid ${selectColor('gray')};

	:hover {
		background-color: ${selectColor('bgWhite')};
		color: ${selectColor('black')};
	}
`

const Chevron = styled(IconChevronRight).attrs({ size: `${selectSpacing(2)}px`, stroke: 1.5 })<{
	opened?: 0 | 1
}>`
	transition: transform 200ms ease;
	transform: rotate(
		${({ opened, theme: { dir } }) => (dir === 'rtl' ? (opened ? 90 : 180) : opened ? 90 : 0)}deg
	);
`

const StyledCollapse = styled(Collapse)`
	> * {
		display: flex;
		flex-direction: column;
	}
`

function LinksGroup({ icon: Icon, label, initiallyOpened, links }: LinksGroupProps) {
	const hasLinks = Array.isArray(links)
	const [opened, setOpened] = useState<0 | 1>(initiallyOpened ? 1 : 0)

	return (
		<>
			<NavbarLinkContainer onClick={() => setOpened((o) => (o ? 0 : 1))}>
				<Group position="apart" spacing={0}>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<ThemeIcon variant="light" size={30}>
							<Icon size="1.1rem" />
						</ThemeIcon>
						<NavbarLinkLabel>{label}</NavbarLinkLabel>
					</Box>
					{hasLinks ? <Chevron opened={opened} /> : null}
				</Group>
			</NavbarLinkContainer>
			{hasLinks ? (
				<StyledCollapse in={Boolean(opened)}>
					{(links ?? []).map((link) => (
						<NavbarLinkItem<typeof Link>
							href={link.link}
							key={link.label}
							onClick={(event) => event.preventDefault()}
						>
							{link.label}
						</NavbarLinkItem>
					))}
				</StyledCollapse>
			) : null}
		</>
	)
}

const Base = styled(MantineNavbar).attrs({ hiddenBreakpoint: 'sm' })`
	width: 300px;
	padding: ${selectSpacing(1.5)}px;
	right: ${({ theme: { dir } }) => (dir === 'rtl' ? 0 : undefined)};
	position: relative;
`

const Inner = styled.div`
	padding: ${selectSpacing(3)}px 0;
`

const Footer = styled(MantineNavbar.Section)`
	border-top: solid ${selectSpacing(0.125)}px ${selectColor('blue')};
	margin: ${selectSpacing(1.25)}px 0;
`

const Navbar: React.FC<{ hidden?: boolean }> = ({ hidden }) => {
	const { data: session } = useSession()
	console.log(session)

	return (
		<Base hidden={hidden}>
			<MantineNavbar.Section
				grow
				component={ScrollArea}
				sx={{ margin: `0 calc(${selectSpacing(2)}px * -0.5)` }}
			>
				<Inner>
					{navbarLinks.map((item) => (
						<LinksGroup {...item} key={item.label} />
					))}
				</Inner>
			</MantineNavbar.Section>

			<LanguagePicker />
			<Footer>
				{session?.user?.email && session.user.name && session.user.image ? (
					<UserButton
						image={session.user.image}
						name={session.user.name}
						email={session.user.email}
					/>
				) : (
					<Button component={Link} color="dark" sx={{ width: '100%' }} href={'/login'}>
						Login
					</Button>
				)}
				{session ? (
					<Button color="dark" sx={{ width: '100%' }} onClick={() => signOut()}>
						Logout
					</Button>
				) : null}
			</Footer>
		</Base>
	)
}

export default Navbar

const navbarLinks = [
	{
		label: 'Participate',
		icon: IconUsersGroup,
		initiallyOpened: true,
		links: [
			{ label: 'Overview', link: '/' },
			{ label: 'Upcoming votes', link: '/' },
			{ label: 'Previous votes', link: '/' },
		],
	},
	{ label: 'Trust', icon: IconShieldHalfFilled },
	{ label: 'Support', icon: IconHomeDollar },
]
