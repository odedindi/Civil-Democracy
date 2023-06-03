import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import theme, { Dir } from '@/config/theme'

import { MantineProvider } from '@mantine/core'
import nextI18nextConfig from '../../next-i18next.config'
import { useRouter } from 'next/router'

const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  * {
    margin: 0;
    padding: 0;
  }
  html,
  body {
    height: 100%;
  }
  body {
    -webkit-font-smoothing: antialiased;
    margin: 0;
    padding: 0;
    ${theme.fonts.body}
    line-height: 1.2;
    font-family: 'Work Sans';
    font-style: normal;
    letter-spacing: 0;
  }
  img,
  picture,
  video,
  canvas,
  input,
  button,
  textarea,
  select {
    font: inherit !important;
  }
  button, input[type="submit"], input[type="reset"] {
	background: none;
	color: inherit;
	border: none;
	cursor: pointer;
	outline: inherit;
}
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
    font-weight: inherit;
  }
  #root,
  #__next {
    isolation: isolate;
  }
`

const RtlWrapper = styled.div`
	> * {
		direction: ${({ theme: { dir } }) => dir};
	}
`
const StylesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	const activeLocale = useRouter().locale
	const isRtl = !!activeLocale && nextI18nextConfig.rtlLocales.includes(activeLocale)
	const dir: Dir = isRtl ? 'rtl' : 'ltr'
	return (
		<ThemeProvider theme={{ ...theme, dir }}>
			<GlobalStyles />
			<MantineProvider withNormalizeCSS inherit theme={{ fontFamily: 'Work Sans, Campton', dir }}>
				<RtlWrapper>{children}</RtlWrapper>
			</MantineProvider>
		</ThemeProvider>
	)
}
export default StylesProvider
