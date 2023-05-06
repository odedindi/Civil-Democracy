import {
	Device,
	selectColor,
	selectFont,
	selectMinMediaQuery,
	selectSpacing,
} from '@/utils/themeUtils'

import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import SmallScreenLayoutLoginForm from './SmallScreenLayoutLoginForm'

const Base = styled.div<{ hiddenfrom: Device }>`
	display: flex;
	flex-direction: column;

	margin: auto;
	padding: ${selectSpacing(10)}px ${selectSpacing(2.5)}px;
	${({ hiddenfrom }) => selectMinMediaQuery(hiddenfrom)} {
		display: none;
	}
`
const Title = styled.h1`
	${selectFont('h1')}
	margin-bottom: ${selectSpacing(2)}px;
`

const SubTitle = styled.p`
	${selectFont('camptonMd')};
	color: ${selectColor('gray')};
`

const SmallScreenLayout: React.FC<{ hiddenfrom: Device }> = ({ hiddenfrom }) => {
	const { t } = useTranslation('common', { keyPrefix: 'login' })

	return (
		<Base hiddenfrom={hiddenfrom}>
			<Title>{t('login')}</Title>
			<SubTitle>{t('welcomeBack')}</SubTitle>
			<SubTitle>{t('loginWithCredentials')}</SubTitle>
			<SmallScreenLayoutLoginForm />
		</Base>
	)
}

export default SmallScreenLayout
