module.exports = {
	debug: false, // process.env.NODE_ENV === 'development',
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'de', 'he', 'fa-IR'],
	},
	localePath: 'src/config/locales',
	ns: ['common'],
	rtlLocales: ['he', 'fa-IR'],
}
