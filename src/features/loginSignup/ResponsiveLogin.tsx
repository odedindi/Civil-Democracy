import styled from 'styled-components'
import Navi from './components/Navi'
import {
	selectMinMediaQuery,
	selectColor,
	Device,
	selectFont,
	selectSpacing,
} from '@/utils/themeUtils'
import { useTranslation } from 'next-i18next'

import { LanguagePicker } from '@/ui/LanguagePicker'
import { useLogin } from './hooks/useLogin'
import LargeScreenLayout from './components/LargeScreenLayout'
import LargeScreenLoginForm from './components/LargeScreenLoginForm'
import LargeScreenLoginHero from './components/LargeScreenLoginHero'
import SmallScreenLayout from './components/SmallScreenLayout'
import SmallScreenLoginForm from './components/SmallScreenLoginForm'

const defaultBreakpoint: Device = 'laptop'
const Base = styled.div<{ breakpoint: Device }>`
	display: flex;
	flex-direction: column;

	background-color: ${selectColor('white')};
	min-height: 100vh;
	${({ breakpoint }) => selectMinMediaQuery(breakpoint)} {
		background-color: ${selectColor('bgWhite')};
	}
`
const Inner = styled.div`
	width: 100vw;
	margin: auto;
	padding: 0 ${selectSpacing(2.5)}px;
`

const Title = styled.h1`
	${selectFont('h1')}
	margin-bottom: ${selectSpacing(2)}px;
`

const SubTitle = styled.p`
	${selectFont('camptonMd')};
	color: ${selectColor('gray')};
	white-space: break-spaces;
`

const ResponsiveLogin: React.FC<{ breakpoint?: Device }> = ({ breakpoint = defaultBreakpoint }) => {
	const { t } = useTranslation('common', { keyPrefix: 'profile.loginForm' })
	const loginForm = useLogin()

	return (
		<Base breakpoint={breakpoint}>
			<Navi type="login" />
			<Inner>
				<LargeScreenLayout visiblefrom={breakpoint}>
					<LargeScreenLoginHero />
					<LargeScreenLoginForm loginForm={loginForm} />
				</LargeScreenLayout>
				<SmallScreenLayout hiddenfrom={breakpoint}>
					<Title>{t('title')}</Title>
					<SubTitle>{t('subtitle')}</SubTitle>
					<SmallScreenLoginForm loginForm={loginForm} />
				</SmallScreenLayout>
			</Inner>
			<LanguagePicker />
		</Base>
	)
}

export default ResponsiveLogin
