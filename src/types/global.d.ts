// Use type safe message keys with `next-intl`
type Messages = typeof import('../i18n/locales/en.json');

// eslint-disable-next-line
declare interface IntlMessages extends Messages {}
