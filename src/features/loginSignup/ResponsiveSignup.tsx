import styled from 'styled-components'
import Navi from './components/Navi'
import {
	selectMinMediaQuery,
	selectColor,
	Device,
	selectFont,
	selectSpacing,
} from '@/utils/themeUtils'

import { LanguagePicker } from '@/ui/LanguagePicker'
import { useSignup } from './hooks/useSignup'
import SmallScreenLayout from './components/SmallScreenLayout'
import { useTranslation } from 'next-i18next'
import SmallScreenSignupForm from './components/SmallScreenSignupForm'
import LargeScreenLayout from './components/LargeScreenLayout'
import LargeScreenSignupHero from './components/LargeScreenSignupHero'
import LargeScreenSignupForm from './components/LargeScreenSignupForm'

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
	width: 100%;
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
`

const ResponsiveSignup: React.FC<{ breakpoint?: Device }> = ({
	breakpoint = defaultBreakpoint,
}) => {
	const { t } = useTranslation('common', { keyPrefix: 'profile.signupForm' })
	const signupForm = useSignup()

	return (
		<Base breakpoint={breakpoint}>
			<Navi type="signup" />
			<Inner>
				<LargeScreenLayout columnsLayout={'2fr 1fr'} visiblefrom={breakpoint}>
					<LargeScreenSignupForm signupForm={signupForm} />
					<LargeScreenSignupHero />
				</LargeScreenLayout>
				<SmallScreenLayout hiddenfrom={breakpoint}>
					<Title>{t('title')}</Title>
					<SubTitle>{t('subtitle')}</SubTitle>
					<SmallScreenSignupForm signupForm={signupForm} />
				</SmallScreenLayout>
			</Inner>
			<LanguagePicker />
		</Base>
	)
}
export default ResponsiveSignup
