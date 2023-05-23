import { omit } from 'lodash'
import type { NextRouter } from 'next/router'

export const setQueryOnPage = (
	router: NextRouter,
	query: { [paramName: string]: string | number | never[] },
) => {
	router.replace(
		{
			pathname: router.pathname,
			query: {
				...router.query,
				...query,
			},
		},
		{
			pathname: router.asPath?.split('?')[0],
			query: {
				...omit(router.query, ['slug']),
				...query,
			},
		},
		{ shallow: true, scroll: false },
	)
}
