import { iff, selectColor, selectFont, selectSpacing } from '@/utils/themeUtils'

import Link from 'next/link'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import { Image } from '@mantine/core'
import InstantUpdatesLinks from './InstantUpdatesLinks'

const Base = styled.div`
	display: flex;
	flex-direction: column;

	justify-content: start;
	align-items: center;

	padding: 0 ${selectSpacing(3)}px;
`

const LargeCircleWithGradient = styled.div`
	background: linear-gradient(
		0deg,
		#ffffff 7.69%,
		#f8fcfe 22.13%,
		#e6f3fc 42.12%,
		#c7e5f9 65.44%,
		#9cd1f5 90.99%,
		#67b8ef 118.75%
	);
	opacity: 0.42;

	border-radius: 50%;

	height: 63px;
	width: 67px;
	position: fixed;
	bottom: 30%;
	${iff((p: any) => p.theme.dir === 'ltr')`
		right: -33px;
		transform: rotate(-98.66deg);
	`}
	${iff((p: any) => p.theme.dir === 'rtl')`
		left: -33px;
		transform: rotate(98.66deg);
	`}
`

const SmallCircleWithGradient = styled.div`
	background: linear-gradient(
		0deg,
		#ffffff 7.69%,
		#f8fcfe 22.13%,
		#e6f3fc 42.12%,
		#c7e5f9 65.44%,
		#9cd1f5 90.99%,
		#67b8ef 118.75%
	);
	opacity: 0.42;

	border-radius: 50%;

	height: 53px;
	width: 50px;
	position: fixed;
	bottom: -25px;
	${iff((p: any) => p.theme.dir === 'ltr')`
		right: 33%;
		transform: rotate(-2.05deg);
	`}
	${iff((p: any) => p.theme.dir === 'rtl')`
		left: 33%;
		transform: rotate(2.05deg);
	`}
`

const BlueLittleCircle = styled.div`
	background-color: ${selectColor('blue')};
	border-radius: 50%;

	height: 20px;
	width: 20px;
	position: absolute;
	top: 10px;
	${iff((p: any) => p.theme.dir === 'ltr')`
			right: 30%;
		`}
	${iff((p: any) => p.theme.dir === 'rtl')`
			left: 30%;
		`}
`

const Title = styled.h1`
	${selectFont('h3')};
	font-size: clamp(34px, 2vw, 44px);
	text-align: center;
	white-space: pre-line;
	word-break: break-all;
	color: ${selectColor('blue')};
	margin-top: ${selectSpacing(0.5)}px;
`

const Divider = styled.div`
	height: 1px;
	width: 100%;
	margin: ${selectSpacing(5)}px 0;
	background: ${selectColor('blue')};
`

const SignupHero: React.FC = () => {
	const { t } = useTranslation('common', { keyPrefix: 'profile.signupForm.hero' })
	return (
		<Base>
			<BlueLittleCircle />
			<Image src="/assets/signup-hero.svg" alt="" width={345} height={395} />
			<Title>{t('title')}</Title>
			<Divider />
			<InstantUpdatesLinks />
			<LargeCircleWithGradient />
			<SmallCircleWithGradient />
		</Base>
	)
}

export default SignupHero
