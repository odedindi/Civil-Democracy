import { ThemeProvider, createGlobalStyle } from 'styled-components'

import { MantineProvider } from '@mantine/core'
import { Work_Sans } from 'next/font/google'
import theme from '@/config/theme'

const workSans = Work_Sans({
	weight: ['400', '500', '600', '700'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
})

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
    font-family: ${workSans.style.fontFamily};
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
    font: inherit;
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

const StylesProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
	<ThemeProvider theme={theme}>
		<GlobalStyles />
		<MantineProvider inherit>{children}</MantineProvider>
	</ThemeProvider>
)
export default StylesProvider
