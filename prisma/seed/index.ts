import { seedUsers } from './users'

const seed = async () => {
	try {
		console.time('[...seeding...]')
		// upsertUsers()
		await seedUsers()
		console.timeEnd('[...seeding...]')
	} catch (e) {
		console.info('seeding error: ', e)
	}
}

seed()
	.then(() => {
		console.info('done')
		process.exit(0)
	})
	.catch((error) => {
		console.info('seeding error: ', error)
		process.exit(-1)
	})
