import {
	Color,
	Font,
	Size,
	ThemeGroup,
	ThemeKeyOrFunc,
	ThemeKeySelector,
	TransformFunc,
} from '../config/theme'

import get from 'lodash/get'
import isFunction from 'lodash/isFunction'
import isNumber from 'lodash/isNumber'
import sizes from '../config/theme/sizes'

export const select =
	<T extends string>(
		group: ThemeGroup,
		themeKeyOrFunc: ThemeKeyOrFunc<T>,
		transform: TransformFunc = null,
	) =>
	(props: any) => {
		let transformFunc = null
		const theme = props.theme

		if (transform) {
			if (isNumber(transform)) {
				transformFunc = (v: any) => (transform as number) * v
			} else if (isFunction(transform)) {
				transformFunc = transform
			} else {
				// eslint-disable-next-line no-console
				console.warn('transform has to be function or number')
			}
		}

		const themeKey = isFunction(themeKeyOrFunc)
			? (themeKeyOrFunc as ThemeKeySelector<T>)(props)
			: themeKeyOrFunc

		const value = get(theme[group], themeKey, themeKey)
		if (transformFunc) {
			return transformFunc(value)
		}

		return value
	}

export const selectColor = (themeKeyOrFunc: ThemeKeyOrFunc<Color>, transform?: TransformFunc) =>
	select('colors', themeKeyOrFunc, transform)

export const selectSize = (themeKeyOrFunc: ThemeKeyOrFunc<Size>, transform?: TransformFunc) =>
	select('sizes', themeKeyOrFunc, transform)

export const selectFont = (themeKeyOrFunc: ThemeKeyOrFunc<Font>, transform?: TransformFunc) =>
	select('fonts', themeKeyOrFunc, transform)

export const selectSpacing = (faktor: number): number => sizes.basePadding * faktor

export const setOpacity = (hex: string, opacity: number) => {
	if (typeof hex !== 'string' || !/^#([A-Fa-f0-9]{3}$|[A-Fa-f0-9]{6}$|[A-Fa-f0-9]{8}$)/.test(hex))
		throw new Error('Invalid hexadecimal color value')
	if (typeof opacity !== 'number' || opacity > 1 || opacity < 0)
		throw new Error('Opacity should be float between 0 - 1')
	let color = hex.substring(1)
	if (color.length === 8) color = color.substring(0, color.length - 2)
	if (color.length === 3) color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2]
	color += Math.round(opacity * 255)
		.toString(16)
		.padStart(2, '0')
	return `#${color}`.toUpperCase()

	// return `${hex}${Math.floor(opacity * 255)
	// 	.toString(16)
	// 	.padStart(2, "0")}`
}
export const devices = {
	phone: 320,
	tablet: 768,
	laptop: 1080,
	desktop: 1200,
	largeScreen: 1920,
}

type MediaQueryValue = number | keyof typeof devices
type MediaQuery =
	| { 'min-width': MediaQueryValue }
	| { 'max-width': MediaQueryValue }
	| { 'min-height': MediaQueryValue }
	| { 'max-height': MediaQueryValue }

export const selectCustomMediaQuery = (mediaQuery: MediaQuery, ...rest: MediaQuery[]) => {
	const [[queryKey, Queryvalue]] = Object.entries(mediaQuery)

	const additionalQueries = !rest.length
		? ''
		: rest.reduce((additionalQueries, query) => {
				const [[queryKey, Queryvalue]] = Object.entries(query)

				return `${additionalQueries} and (${queryKey}:${
					typeof Queryvalue === 'number' ? Queryvalue : devices[Queryvalue]
				}px)`
		  }, '')

	return `@media only screen and (${queryKey}:${
		typeof Queryvalue === 'number' ? Queryvalue : devices[Queryvalue]
	}px)${additionalQueries}
    `
}

export const mediaQuery = {
	phone: selectCustomMediaQuery({ 'min-width': devices.phone }),
	tablet: selectCustomMediaQuery({ 'min-width': devices.tablet }),
	laptop: selectCustomMediaQuery({ 'min-width': devices.laptop }),
	desktop: selectCustomMediaQuery({ 'min-width': devices.desktop }),
	largeScreen: selectCustomMediaQuery({ 'min-width': devices.largeScreen }),
}

export const selectMediaQuery = (screenType: keyof typeof mediaQuery) => mediaQuery[screenType]

export const TICKER_PAGE_MIN_HEIGHT = devices.tablet
