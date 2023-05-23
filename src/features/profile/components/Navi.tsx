import { selectColor, selectFont, selectMinMediaQuery, selectSpacing } from '@/utils/themeUtils'
import styled from 'styled-components'

import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useSession } from 'next-auth/react'
import Logo from '@/ui/Logo'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

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
	${selectMinMediaQuery('tablet')} {
		display: block;
	}
`
const LogoWrapper = styled.div`
	flex: 1;
`

const Button = styled.button`
	width: 124px;
	height: 45px;
	background: ${selectColor('blue')};
	color: ${selectColor('white')};
	${selectFont('body')};
	border-radius: ${selectSpacing(0.5)}px;
`

type NaviProps = {
	type: 'login' | 'signup'
}

const Navi: React.FC<NaviProps> = ({ type }) => {
	const router = useRouter()

	const { t } = useTranslation('common', { keyPrefix: `profile.${type}Form` })

	const session = useSession()
	console.log(session)

	useEffect(() => {
		if (session.status === 'authenticated') router.push('/')
	}, [router, session.status])

	return (
		<Base>
			<LogoWrapper>
				<Logo href="/" />
			</LogoWrapper>
			<P>{t('naviHelperText')}</P>
			<Link href={`${type === 'signup' ? 'login' : 'signup'}`}>
				<Button>{t('naviButtonLabel')}</Button>
			</Link>
		</Base>
	)
}

export default Navi
