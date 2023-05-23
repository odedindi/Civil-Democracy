import { hash } from 'bcrypt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedUsers() {
	let createdUsersCount = 0

	const users = [
		{
			email: 'admin',
			password: await hash('admin', 10),
			role: 'ADMIN',
			name: 'admin',
		},
		{
			email: 'odi@panter.ch',
			password: null,
			role: 'ADMIN',
			name: 'Oded',
		},
	] as const
	for await (const { email, password, role, name } of users) {
		const upsertedUser = await prisma.user.upsert({
			where: { email },
			create: {
				email,
				password,
				role,
				name,
			},
			update: { updatedAt: new Date() },
		})
		if (upsertedUser) createdUsersCount++
	}

	console.log(`${createdUsersCount} users upserted`)
}
