import { Image, ActionIcon } from '@mantine/core'

import { selectColor, selectFont, selectSpacing } from '@/utils/themeUtils'
import styled from 'styled-components'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import React from 'react'

const Footer = styled.div`
	display: flex;
	flex-direction: column;

	gap: ${selectSpacing(2)}px;
	justify-content: center;
	align-items: center;
`
const Row = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: ${selectSpacing(4)}px;
`

const P = styled.p`
	${selectFont('body')}
	color:${selectColor('black')};
`

const InstantUpdatesLinks: React.FC = () => {
	const { t } = useTranslation('common', { keyPrefix: 'login.footer' })

	return (
		<Footer>
			<P>{t('instantUpdates')}</P>
			<Row>
				<ActionIcon variant="transparent" component={Link} href={'#'} title="Instagram">
					<Image src="/assets/icons/instagram.svg" alt="user-icon" width={24} />
				</ActionIcon>
				<ActionIcon variant="transparent" component={Link} href={'#'} title="Twitter">
					<Image src="/assets/icons/twitter.svg" alt="user-icon" width={24} />
				</ActionIcon>
			</Row>
		</Footer>
	)
}

export default InstantUpdatesLinks
