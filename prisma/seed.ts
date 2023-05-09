import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
	const data = {
		email: 'test@gmail.com',
		role: 'ADMIN',
	} as const
	await prisma.user.upsert({
		create: data,
		update: {},
		where: { email: data.email },
	})
}

seed()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
