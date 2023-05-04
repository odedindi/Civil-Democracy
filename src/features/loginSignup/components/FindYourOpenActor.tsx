import { selectColor, selectFont, selectSpacing } from '@/utils/themeUtils'

import { Image } from '@mantine/core'
import Link from 'next/link'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'

const Base = styled.div`
	height: 75vh;
	display: flex;
	flex-direction: column;

	justify-content: center;
	align-items: center;
	gap: ${selectSpacing(3)}px;
`

const Container = styled.div`
	position: absolute;
	z-index: 1;
`
const BrightCircle = styled(Image).attrs({
	src: '/assets/Ellipse 1.svg',
	alt: '',
	height: 442.5,
	width: 456,
})`
	position: relative;
	top: -${selectSpacing(30.5)}px;
`
const BlueCircle = styled(Image).attrs({
	src: '/assets/Ellipse 2.svg',
	alt: '',
	height: 48,
	width: 48,
})`
	position: relative;
	top: -${selectSpacing(35)}px;
	padding-inline-start: ${selectSpacing(42.5)}px;
`

const DarkCircle = styled(Image).attrs({
	src: '/assets/Ellipse 3.svg',
	alt: '',
	height: 442.5,
	width: 456,
})`
	position: relative;
	top: ${selectSpacing(25)}px;
	right: ${selectSpacing(5)}px;
`

const BrightVector = styled(Image).attrs({
	src: '/assets/Vector 2.svg',
	alt: '',
	width: 207.5,
})`
	position: relative;
	top: -${selectSpacing(75)}px;
	padding-inline-start: ${selectSpacing(32.5)}px;
`

const DarkVector = styled(Image).attrs({
	src: '/assets/Vector 3.svg',
	alt: '',
	width: 207.5,
})`
	position: relative;
	top: -${selectSpacing(34)}px;
	margin-inline-start: ${selectSpacing(5)}px;
`

const Title = styled.h1`
	z-index: 2;
	${selectFont('h1')};
	font-size: 48px;
	white-space: pre-line;
	word-break: break-all;
	color: ${selectColor('black')};
	width: 415px;
	padding-inline-start: ${selectSpacing(3)}px;

	position: relative;
	bottom: ${selectSpacing(3)}px;
`
const A = styled(Link)`
	z-index: 2;
	text-decoration-line: underline;
	${selectFont('bodyLg')};
	color: ${selectColor('blue')};
	position: relative;
	bottom: ${selectSpacing(3)}px;
	margin-inline-start: -${selectSpacing(12.5)}px;

	width: 260px;
`

export const FindYourOpenActor: React.FC = () => {
	const { t } = useTranslation('common', { keyPrefix: 'login.findYourOpenActor' })
	return (
		<Base>
			<Container>
				<DarkCircle />
				<BrightCircle />
				<BrightVector />
				<DarkVector />
				<BlueCircle />
			</Container>
			<Title>{t('title')}</Title>
			<A href={'#'}>{t('linkLabel')}</A>
		</Base>
	)
}
