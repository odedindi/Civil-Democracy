import { selectColor, selectFont, selectMediaQuery, selectSpacing } from '@/utils/themeUtils'
import styled, { css } from 'styled-components'

import { Image } from '@mantine/core'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

const ShowOnLargeScreen = css`
	display: none;
	${selectMediaQuery('laptop')} {
		display: block;
	}
`
const ShowOnSmallScreen = css`
	display: block;
	${selectMediaQuery('laptop')} {
		display: none;
	}
`

const Base = styled.nav`
	width: 100%;
	height: 100px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: ${selectSpacing(2.5)}px;
	padding: 0 ${selectSpacing(2.5)}px;
`

const P = styled.p`
	${selectFont('body')}

	display: none;
	${selectMediaQuery('laptop')} {
		display: block;
	}
`
const LargeLogo = styled(Image).attrs({
	src: '/assets/logo-big.svg',
	alt: 'civil-democracy logo',
	width: 165,
})`
	flex: 1;

	display: none;
	${selectMediaQuery('laptop')} {
		display: block;
	}
`

const Button = styled.button`
	width: 124px;
	height: 45px;
	background: ${selectColor('black')};
	color: ${selectColor('white')};
	${selectFont('body')};
	border-radius: ${selectSpacing(1)}px;

	display: none;
	${selectMediaQuery('laptop')} {
		display: block;
	}
`

const SmallLogo = styled(Image).attrs({
	src: '/assets/logo-small.svg',
	alt: 'civil-democracy logo',
	width: 34,
})`
	flex: 1;

	display: block;
	${selectMediaQuery('laptop')} {
		display: none;
	}
`

const A = styled(Link)`
	${selectFont('camptonSm')};
	color: ${selectColor('black')};

	display: block;
	${selectMediaQuery('laptop')} {
		display: none;
	}
`

const LoginNavi: React.FC = () => {
	const { t } = useTranslation('common', { keyPrefix: 'login' })

	return (
		<Base>
			<LargeLogo />
			<SmallLogo />
			<P>{t('createAccount')}</P>
			<Button
				onClick={() => {
					console.log('login clicked')
				}}
			>
				{t('login')}
			</Button>
			<A href={'#'}>{t('help')}</A>
		</Base>
	)
}

export default LoginNavi
