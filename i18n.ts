import { UseTranslationResponse, initReactI18next } from 'react-i18next'
import i18n, { InitOptions } from 'i18next'

import { localePath } from './next-i18next.config'

type Resource = Record<string, string>
type Resources = {
	[locale: string]: { common: Resource }
}
const resources: Resources = {
	en: { common: require(`${localePath}/en/common.json`) as Resource },
	de: { common: require(`${localePath}/de/common.json`) as Resource },
}
const options: InitOptions = {
	lng: 'en',
	fallbackLng: 'en',
	debug: process.env.NODE_ENV !== 'production',
	interpolation: {
		escapeValue: false,
	},
	resources,
}

i18n.use(initReactI18next).init(options)

export default i18n
// export type { UseTranslationResponse }
