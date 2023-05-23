import { selectColor, selectFont } from '@/utils/themeUtils'
import {
	createStyles,
	Paper,
	Button,
	Container,
	Group,
	Anchor,
	Center,
	Box,
	rem,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconArrowLeft } from '@tabler/icons-react'
import Link from 'next/link'
import styled from 'styled-components'
import { InputEmail } from './components/fields'

type ResetPasswordFormFields = {
	email: string
}

const Title = styled.h2`
	${selectFont('h2')};
	text-align: center;
`

const SubTitle = styled.p`
	${selectFont('h4')};
	color: ${selectColor('gray')};
	text-align: center;
`

const useStyles = createStyles((theme) => ({
	controls: {
		[theme.fn.smallerThan('xs')]: {
			flexDirection: 'column-reverse',
		},
	},

	control: {
		[theme.fn.smallerThan('xs')]: {
			width: '100%',
			textAlign: 'center',
		},
	},
}))

const ResetPassword: React.FC = () => {
	const { classes } = useStyles()

	const form = useForm<ResetPasswordFormFields>({
		initialValues: {
			email: '',
		},

		validate: {
			email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
		},
	})

	return (
		<Container size={460} my={60}>
			<Title>Forgot your password?</Title>
			<SubTitle>Enter your email to get a reset link</SubTitle>

			<Paper withBorder shadow="sm" p={30} mt="xl">
				<form
					onSubmit={form.onSubmit(
						(values) => {
							console.log('login', values)
						},
						(errors) => console.error(errors),
					)}
				>
					<InputEmail {...form.getInputProps('email')} withAsterisk />

					<Group position="apart" mt="lg" className={classes.controls}>
						<Anchor
							component={Link}
							href="login"
							color="dimmed"
							size="sm"
							className={classes.control}
						>
							<Center inline>
								<IconArrowLeft size={rem(12)} stroke={1.5} />
								<Box ml={5}>Back to the login page</Box>
							</Center>
						</Anchor>
						<Button type="submit" className={classes.control}>
							Reset password
						</Button>
					</Group>
				</form>
			</Paper>
		</Container>
	)
}

export default ResetPassword
