import { Image } from '@mantine/core'

import { selectColor, selectFont, selectSpacing } from '@/utils/themeUtils'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'

const Base = styled.div`
	display: grid;
	grid-template-columns: auto 1fr;
	grid-template-rows: auto auto;
	gap: ${selectSpacing(2)}px;

	color: ${selectColor('white')};

	margin-bottom: ${selectSpacing(5)}px;
`
const IconContainer = styled.div`
	background-color: white;
	border-radius: ${selectSpacing(1.25)}px;
	padding: ${selectSpacing(0.5)}px;
	width: ${selectSpacing(8)}px;
	height: ${selectSpacing(8)}px;
	display: flex;
	justify-content: center;
	align-items: center;

	grid-column: 1/2;
	grid-row: 1/3;
`

const H2 = styled.h2`
	${selectFont('h2')};
	position: relative;
	top: ${selectSpacing(0.75)}px;
`

const P = styled.p`
	${selectFont('camptonMd')};
	position: relative;
	bottom: ${selectSpacing(0.5)}px;
`

const LoginNowHeader: React.FC = () => {
	const { t } = useTranslation('common', { keyPrefix: 'login' })

	return (
		<Base>
			<IconContainer>
				<Image src="/assets/icons/login.svg" alt="login-icon" width={48} height={48} />
			</IconContainer>
			<H2>{t('loginNow')}</H2>
			<P>{t('welcomeBack')}</P>
		</Base>
	)
}

export default LoginNowHeader
