import { Image, ActionIcon } from '@mantine/core'

import { selectColor, selectFont, selectSpacing } from '@/utils/themeUtils'
import styled from 'styled-components'
import Input from '@/primitive/Input'
import Link from 'next/link'
import LoginNowHeader from './LoginNowHeader'

const Base = styled.div`
	margin: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const BlueContainer = styled.div`
	width: 498px;
	height: 492px;
	background-color: ${selectColor('blue')};
	border-radius: ${selectSpacing(3.125)}px;
	margin: auto;
	padding: 51px 35px 47px 37px;
	display: flex;
	flex-direction: column;
	align-items: stretch;
`

const Button = styled.button`
	width: 167px;
	height: 51px;
	background: white;
	color: black;
	${selectFont('body')};
	border-radius: ${selectSpacing(1)}px;
	font-family: 'Work Sans';
`

const A = styled.a`
	${selectFont('camptonMd')}
	color: ${selectColor('white')};
	text-decoration: underline;
	text-decoration-color: ${selectColor('white')};
`

const Row = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`

const Footer = styled.div`
	padding-top: ${selectSpacing(6)}px;
	display: flex;
	flex-direction: column;

	gap: ${selectSpacing(2)}px;
	justify-content: center;
	align-items: center;
`

const P = styled.p`
	${selectFont('body')}
`

const LoginNow: React.FC = () => {
	return (
		<Base>
			<BlueContainer>
				<LoginNowHeader />
				<Input
					label="Username"
					icon={<Image src="/assets/icons/user.svg" alt="user-icon" />}
					style={{ marginBottom: `${selectSpacing(5.25)}px` }}
				/>

				<Input
					type="password"
					label="Password"
					style={{ marginBottom: `${selectSpacing(2.5)}px` }}
				/>
				<Link href="#" passHref style={{ marginBottom: `${selectSpacing(5)}px` }}>
					<A>Forgot password?</A>
				</Link>
				<Row>
					<Button>Login Now</Button>
					<Link href="#" passHref>
						<A>Don't have an account?</A>
					</Link>
				</Row>
			</BlueContainer>
			<Footer>
				<P>Instant Updates at</P>
				<Row style={{ gap: `${selectSpacing(4)}px` }}>
					<ActionIcon variant="transparent" component={Link} href={'#'} title="Instagram">
						<Image src="/assets/icons/instagram.svg" alt="user-icon" width={24} />
					</ActionIcon>
					<ActionIcon variant="transparent" component={Link} href={'#'} title="Twitter">
						<Image src="/assets/icons/twitter.svg" alt="user-icon" width={24} />
					</ActionIcon>
				</Row>
			</Footer>
		</Base>
	)
}

export default LoginNow
