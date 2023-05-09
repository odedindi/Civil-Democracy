import { MicroRequest } from 'apollo-server-micro/dist/types'
import { ServerResponse } from 'http'
import { server } from '@/graphql/server'
import { NextApiHandler, NextApiRequest, NextApiResponse, PageConfig } from 'next'

const allowCors = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
	res.setHeader('Access-Control-Allow-Credentials', 'true')
	res.setHeader('Access-Control-Allow-Origin', 'https://studio.apollographql.com')
	res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	if (req.method === 'OPTIONS') {
		res.status(200).end()
		return
	}
	return await fn(req, res)
}

const startServer = server.start()

const handler = async (req: MicroRequest, res: ServerResponse) => {
	await startServer
	await server.createHandler({ path: '/api/graphql' })(req, res)
}

export const config: PageConfig = {
	api: {
		bodyParser: false,
	},
}

export default allowCors(handler)
