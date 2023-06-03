import DashboardLayout from '@/features/layout'
import { useDidMount } from '@/hooks/useDidMount'

import { makeStaticProps } from '@/utils/makeStaticProps'
import { Button, Center, Loader, Stack, Sx } from '@mantine/core'
import type { GetStaticPaths, NextPage } from 'next'
import { useSession } from 'next-auth/react'

import { Avatar, Text, Group } from '@mantine/core'
import { IconPhoneCall, IconAt } from '@tabler/icons-react'
import { useEffect, useMemo, useState } from 'react'
import { InputEmail, InputName } from '@/features/profile/components/fields'
import { useForm } from '@mantine/form'

const inputStyles: Sx = {
	input: {
		borderRadius: '4px',
		padding: '0 8px',
		':focus': {
			opacity: 0.7,
			border: 'solid 0.5px black',
			background: 'white',
		},
		':disabled': {
			background: 'transparent',
			opacity: 1,
			color: 'black',
		},
	},
}

const ProfilePage: NextPage = () => {
	const isMounted = useDidMount()
	const [editProfile, setEditProfile] = useState(false)
	const { data: session } = useSession()
	const initialValues = useMemo(
		() => ({
			name: session?.user?.name ?? '',
			email: session?.user?.email ?? '',
			image: session?.user?.image ?? '',
		}),
		[session],
	)

	const form = useForm<{ name: string; email: string; image: string }>({
		initialValues,
		validate: {
			name: (value) => (value.length < 2 ? 'First name must have at least 2 letters' : null),
			email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
		},
	})

	useEffect(() => {
		form.setValues(initialValues)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialValues])

	if (!isMounted)
		return (
			<Center sx={{ height: '50vh' }}>
				<Loader />
			</Center>
		)

	if (!session?.user) return <>no user found</>
	const user = {
		image: session.user.image,
		email: session.user.email,
		name: session.user.name,
	}

	return (
		<DashboardLayout>
			<Center>
				<form
					onSubmit={form.onSubmit(
						(values) => {
							console.log('profile', values)
							setEditProfile((prev) => !prev)
						},
						(errors) => console.error(errors),
					)}
				>
					<Stack>
						{editProfile ? (
							<Button.Group sx={{ gap: '2px' }}>
								<Button
									sx={{ width: '100%' }}
									type={'button'}
									onClick={(e) => {
										setEditProfile((prev) => !prev)
									}}
									color="red"
								>
									Cancel
								</Button>
								<Button sx={{ width: '100%' }} type={'submit'}>
									Save
								</Button>
							</Button.Group>
						) : (
							<Button
								type={editProfile ? 'submit' : 'button'}
								onClick={(e) => {
									setEditProfile((prev) => !prev)
								}}
							>
								{editProfile ? 'Save' : 'Edit'}
							</Button>
						)}
						{/* <Button
							type={'submit'}
							// onClick={() => {
							// 	console.log('form', form.validate())
							// 	console.log('form', form.values)
							// }}
						>
							Save
						</Button> */}
						<Group w={400}>
							<Avatar src={user?.image} size={120} radius="md" />
							<div>
								<InputName
									{...form.getInputProps('name')}
									withAsterisk
									labelProps={{ display: 'none' }}
									disabled={!editProfile}
									fz="lg"
									fw={500}
									variant="unstyled"
									sx={inputStyles}
								/>

								<Group noWrap spacing={10} mt={3}>
									<IconAt stroke={1.5} size="1rem" />
									<InputEmail
										{...form.getInputProps('email')}
										withAsterisk
										labelProps={{ display: 'none' }}
										disabled={!editProfile}
										fz="lg"
										fw={500}
										variant="unstyled"
										sx={inputStyles}
									/>
								</Group>

								<Group noWrap spacing={10} mt={5}>
									<IconPhoneCall stroke={1.5} size="1rem" />
									<Text fz="xs" c="dimmed">
										example field
									</Text>
								</Group>
							</div>
						</Group>
					</Stack>
				</form>
			</Center>
		</DashboardLayout>
	)
}

export const getStaticProps = makeStaticProps()
export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: false,
	}
}

export default ProfilePage
