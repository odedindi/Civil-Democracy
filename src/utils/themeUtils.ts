import {
	BoxShadow,
	Color,
	Font,
	Size,
	Theme,
	ThemeGroup,
	ThemeKeyOrFunc,
	ThemeKeySelector,
	TransformFunc,
} from '../config/theme'

import get from 'lodash/get'
import isFunction from 'lodash/isFunction'
import isNumber from 'lodash/isNumber'
import sizes from '../config/theme/sizes'
import { css } from 'styled-components'

export const select =
	<T extends string | number>(
		group: ThemeGroup,
		themeKeyOrFunc: ThemeKeyOrFunc<T>,
		transform: TransformFunc = null,
	) =>
	(props: Required<{ theme: Theme }>) => {
		let transformFunc = null
		const theme = props.theme

		if (transform) {
			if (isNumber(transform)) {
				transformFunc = (v: number): number => (transform as number) * Number(v)
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

export const selectBoxShadow = (
	themeKeyOrFunc: ThemeKeyOrFunc<BoxShadow>,
	transform?: TransformFunc,
) => select('boxShadow', themeKeyOrFunc, transform)

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
}

// experimental
export const iff =
	(condition: any) =>
	(first: any, ...vars: any[]) => {
		const ifResult = css(first, ...vars)
		const result = (props: any) => (condition(props) ? ifResult : undefined)
		result.else =
			(f: any, ...othervars: any[]) =>
			(props: any) =>
				condition(props) ? ifResult : css(f, ...othervars)
		return result
	}

export type Device = 'phone' | 'tablet' | 'laptop' | 'desktop' | 'largeScreen'
type MediaQueryValue = number | Device
type MediaQuery =
	| { 'min-width': MediaQueryValue }
	| { 'max-width': MediaQueryValue }
	| { 'min-height': MediaQueryValue }
	| { 'max-height': MediaQueryValue }
export const screenBreakpoints: { [device in Device]: number } = {
	phone: 320,
	tablet: 768,
	laptop: 1080,
	desktop: 1200,
	largeScreen: 1920,
}

export const selectCustomMediaQuery = (mediaQuery: MediaQuery, ...rest: MediaQuery[]) => {
	const [[queryKey, Queryvalue]] = Object.entries(mediaQuery)

	const additionalQueries = !rest.length
		? ''
		: rest.reduce((additionalQueries, query) => {
				const [[queryKey, Queryvalue]] = Object.entries(query)

				return `${additionalQueries} and (${queryKey}:${
					typeof Queryvalue === 'number' ? Queryvalue : screenBreakpoints[Queryvalue]
				}px)`
		  }, '')

	return `@media only screen and (${queryKey}:${
		typeof Queryvalue === 'number' ? Queryvalue : screenBreakpoints[Queryvalue]
	}px)${additionalQueries}
			`
}

export const selectMinMediaQuery = (device: Device) =>
	selectCustomMediaQuery({ 'min-width': device })

export const selectMaxMediaQuery = (device: Device) =>
	selectCustomMediaQuery({ 'max-width': device })
