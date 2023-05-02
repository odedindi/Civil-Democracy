import { Image } from '@mantine/core'
import { selectColor, selectFont, selectSpacing } from '@/utils/themeUtils'

import styled from 'styled-components'

const Base = styled.div`
	height: 80vh;
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
	left: ${selectSpacing(32.5)}px;
`

const DarkVector = styled(Image).attrs({
	src: '/assets/Vector 3.svg',
	alt: '',
	width: 207.5,
})`
	position: relative;
	top: -${selectSpacing(34)}px;
	left: -${selectSpacing(5)}px;
`

const Title = styled.h1`
	z-index: 2;
	${selectFont('h1')};
	white-space: pre-line;
	word-break: break-all;

	width: 400px;
	padding-left: ${selectSpacing(3)}px;
`
const A = styled.p`
	z-index: 2;
	text-decoration-line: underline;
	${selectFont('bodyLg')};
	color: ${selectColor('blue')};
	position: relative;
	left: -${selectSpacing(5.25)}px;
	width: 260px;
`

export const FindYourOpenActor: React.FC = () => (
	<Base>
		<Container>
			<DarkCircle />
			<BrightCircle />
			<BrightVector />
			<DarkVector />
		</Container>
		<Title>{'Find Your Open\nActor'}</Title>
		<A>Learn about Civil Democracy</A>
	</Base>
)
