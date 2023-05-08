import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

declare global {
	var prisma: PrismaClient | undefined
}

if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient({ log: ['info'] })
} else {
	if (!global.prisma) global.prisma = new PrismaClient({ log: ['info'] })
	prisma = global.prisma
}

export { prisma }
export type { PrismaClient }
