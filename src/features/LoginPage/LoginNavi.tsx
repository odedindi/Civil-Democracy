import { Image } from '@mantine/core'

import { selectColor, selectFont, selectSpacing } from '@/utils/themeUtils'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'

const Base = styled.nav`
	width: 100%;
	height: 100px;
	display: flex;
	align-items: center;
	gap: ${selectSpacing(2.5)}px;
	padding: 0 ${selectSpacing(2.5)}px;
`

const P = styled.p`
	${selectFont('body')}
`
const Logo = styled(Image).attrs({
	src: '/assets/logo-big.svg',
	alt: 'civil-democracy logo',
	width: 165,
})`
	flex: 1;
`

const Button = styled.button`
	width: 124px;
	height: 45px;
	background: #0f0f0f;
	color: ${selectColor('white')};
	${selectFont('body')};
	border-radius: ${selectSpacing(1)}px;
`

const LoginNavi: React.FC = () => {
	const { t } = useTranslation('common', { keyPrefix: 'login' })

	return (
		<Base>
			<Logo />
			<P>{t('createAccount')}</P>
			<Button
				onClick={() => {
					console.log('login clicked')
				}}
			>
				{t('login')}
			</Button>
		</Base>
	)
}

export default LoginNavi
