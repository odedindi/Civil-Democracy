import boxShadow from './boxShadow'
import colors from './colors'
import fonts from './fonts'
import sizes from './sizes'

const theme = {
	sizes,
	colors,
	fonts,
	boxShadow,
	dir: 'ltr' as Dir,
}

export type Theme = typeof theme

export type ThemeGroup = keyof Theme
export type Color = keyof Theme['colors']
export type Font = keyof Theme['fonts']
export type Size = keyof Theme['sizes']
export type BoxShadow = keyof Theme['boxShadow']

export type Dir = 'rtl' | 'ltr'
export interface WithThemeProps {
	theme: Theme
}
export type ThemeKeySelector<T> = (props: any) => T
export type ThemeKeyOrFunc<T> = T | ThemeKeySelector<T>
export type TransformFunc = number | ((value: any) => any) | null

export default theme
