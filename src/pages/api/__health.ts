import type { NextApiRequest, NextApiResponse } from 'next'

const __health = (_req: NextApiRequest, res: NextApiResponse) => {
	res.end(`ok`)
}

export default __health
