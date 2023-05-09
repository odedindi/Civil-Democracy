import { iff, selectColor, selectFont, selectSpacing } from '@/utils/themeUtils'

import Link from 'next/link'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'

const Base = styled.div`
	display: flex;
	flex-direction: column;

	justify-content: start;
	align-items: center;
	gap: ${selectSpacing(3)}px;
`

const Container = styled.div`
	position: absolute;
	z-index: 1;

	display: flex;
`

const BackgroundImage = styled.div`
	width: clamp(350px, 40vw, 500px);
	height: clamp(350px, 40vw, 500px);

	background-color: ${selectColor('palePink')};
	border-radius: 50%;

	box-shadow: ${({ theme: { dir } }) => `${dir === 'ltr' ? -3 : 3}vw`} 0 0 0
		${selectColor('darkPalePink')};

	::before {
		content: '';
		display: block;

		background-color: ${selectColor('paleOrange')};

		height: 8px;

		width: 50%;

		border-radius: ${selectSpacing(1)}px;
		position: absolute;
		top: 15%;
		${iff((p: any) => p.theme.dir === 'ltr')`
			right: -40px;
		`}
		${iff((p: any) => p.theme.dir === 'rtl')`
			left: -40px;
		`}
	}
	::after {
		content: '';
		display: block;

		background-color: ${selectColor('darkOrange')};

		height: 8px;

		width: 50%;

		border-radius: ${selectSpacing(1)}px;
		position: absolute;
		bottom: 2.5%;
		${iff((p: any) => p.theme.dir === 'ltr')`
			left: -70px;
		`}
		${iff((p: any) => p.theme.dir === 'rtl')`
			right: -70px;
		`}
	}
`
const BlueLittleCircle = styled.div`
	background-color: ${selectColor('blue')};
	border: solid 5px ${selectColor('white')};
	border-radius: 50%;

	height: 50px;
	width: 50px;
	position: absolute;
	bottom: 0;
	${iff((p: any) => p.theme.dir === 'ltr')`
			right: 40px;
		`}
	${iff((p: any) => p.theme.dir === 'rtl')`
			left: 40px;
		`}
`

const Title = styled.h1`
	z-index: 2;
	${selectFont('h1')};
	font-size: clamp(44px, 4vw, 48px);
	white-space: pre-line;
	word-break: break-all;
	color: ${selectColor('black')};

	position: inherit;
	top: 40%;
	${iff((p: any) => p.theme.dir === 'ltr')`
			left: 5%;
		`}
	${iff((p: any) => p.theme.dir === 'rtl')`
			right: 5%;
		`}
`

const A = styled(Link)`
	z-index: 2;
	text-decoration-line: underline;
	${selectFont('bodyLg')};
	color: ${selectColor('blue')};

	position: inherit;
	top: 65%;
	${iff((p: any) => p.theme.dir === 'ltr')`
			left: 5%;
		`}
	${iff((p: any) => p.theme.dir === 'rtl')`
			right: 5%;
		`}
`

const LoginHero: React.FC = () => {
	const { t } = useTranslation('common', { keyPrefix: 'profile.loginForm.hero' })
	return (
		<Base>
			<Container>
				<BackgroundImage />
				<BlueLittleCircle />
				<Title>{t('title')}</Title>
				<A href={'#'}>{t('linkLabel')}</A>
			</Container>
		</Base>
	)
}

export default LoginHero
