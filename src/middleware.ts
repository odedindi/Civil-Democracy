
import { stackMiddlewares } from '@/middlewares/stackMiddlewares'
import { withHeaders } from '@/middlewares/withHeaders'
import { withLocale } from '@/middlewares/withLocale'

import { MiddlewareFactory } from './middlewares/types'

const middlewares: MiddlewareFactory[] = [withHeaders, withLocale]
export default stackMiddlewares(middlewares)
