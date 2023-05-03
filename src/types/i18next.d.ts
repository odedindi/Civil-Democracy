import 'i18next'

import type common from '../config/locales/en/common.json'

interface Resources {
	common: typeof common
}

declare module 'i18next' {
	interface CustomTypeOptions {
		defaultNS: 'common'
		resources: Resources
	}
}
