import { Button, Stack, Sx } from '@mantine/core'

import { Avatar, Text, Group } from '@mantine/core'
import { IconPhoneCall, IconAt } from '@tabler/icons-react'
import { useState } from 'react'
import { InputEmail, InputName } from '@/features/profile/components/fields'
import { useForm } from '@mantine/form'
import { User } from 'next-auth'

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
type ProfileProps = {
	user: User
}
const ProfileForm: React.FC<ProfileProps> = ({ user }) => {
	const [editProfile, setEditProfile] = useState(false)

	const form = useForm<ProfileProps['user']>({
		initialValues: user,
		validate: {
			name: (value) =>
				value && value.length < 2 ? 'First name must have at least 2 letters' : null,
			email: (value) => (value && /^\S+@\S+$/.test(value) ? null : 'Invalid email'),
		},
	})

	return (
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

				<Group w={400}>
					<Avatar src={form.values.image} size={120} radius="md" />
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
								disabled={true} // email must be allow to change only by admin
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
	)
}

export default ProfileForm
