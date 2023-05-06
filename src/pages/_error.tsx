import { makeStaticProps } from '@/utils/makeStaticProps'
import { selectColor, selectFont, selectMediaQuery, selectSpacing } from '@/utils/themeUtils'
import { Image } from '@mantine/core'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import styled, { css } from 'styled-components'

const Base = styled.div`
	height: 100vh;
	padding: ${selectSpacing(15)}px ${selectSpacing(5)}px;
	background-color: ${selectColor('bgWhite')};

	display: grid;
	grid-gap: ${selectSpacing(3)}px;
	grid-auto-flow: column;
	grid-template-columns: 1fr;
	grid-template-rows: 0.25fr 1fr;
	${selectMediaQuery('tablet')} {
		height: 100vh;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr;
	}
`

const BackgroundImage = styled(Image).attrs({
	src: '/assets/error_page_image.svg',
	alt: 'woman looks for direction',
})<{ hideon?: 'small' | 'large' }>`
	margin: auto;

	${({ hideon }) =>
		!hideon
			? null
			: hideon === 'large'
			? css`
					display: none;
					${selectMediaQuery('tablet')} {
						display: unset;
					}
			  `
			: css`
					${selectMediaQuery('tablet')} {
						display: none;
					}
			  `}
`

const Col = styled.div`
	margin: auto;

	display: flex;
	flex-direction: column;
	gap: ${selectSpacing(5)}px;
`

const Title = styled.h1`
	text-align: center;
	${selectFont('h2')};
	${selectMediaQuery('tablet')} {
		${selectFont('h1')};
	}
`
const P = styled.p`
	${selectFont('bodyMd')};
	color: ${selectColor('gray')};

	word-break: break-all;
`

const Button = styled.button`
	width: 100%;
	height: ${selectSpacing(5)}px;

	${selectFont('body')};
	border-radius: ${selectSpacing(1)}px;
	border: solid 1px ${selectColor('blue')};

	color: ${selectColor('blue')};

	:active {
		transform: translateY(1%);
	}
`

export default function ErrorPage() {
	const { t } = useTranslation('common', { keyPrefix: 'errorPage' })
	return (
		<Base>
			<BackgroundImage hideon="small" />
			<Col>
				<Title>{t('title')}</Title>
				<P>{t('subTitle')} </P>
				<Link href={'/'} passHref>
					<Button>{t('buttonLabel')}</Button>
				</Link>
			</Col>
			<BackgroundImage hideon="large" />
		</Base>
	)
}

export const getStaticProps = makeStaticProps()
