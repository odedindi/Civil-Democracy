import { selectColor, selectFont, selectSpacing } from '@/utils/themeUtils'
import { useState } from 'react'
import { Menu, Group } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'

import styled from 'styled-components'

import Flag from 'react-world-flags'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

const Base = styled(Menu)`
	* {
		${selectFont('bodyMd')}
	}
`

const Container = styled.button<{
	opened?: boolean
}>`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: ${selectSpacing(0.5)}px ${selectSpacing(1)}px;
	border-radius: ${selectSpacing(0.5)}px;
	border: ${selectSpacing(0.125)}px solid ${selectColor('lightGray')};
	transition: background-color 150ms ease;
	background-color: ${({ opened }) => (opened ? selectColor('bgWhite') : selectColor('white'))};

	:hover {
		background-color: ${selectColor('bgWhite')};
	}
`

const Icon = styled(IconChevronDown).attrs({ size: `${selectSpacing(2)}px`, stroke: 1.5 })<{
	opened?: boolean
}>`
	transition: transform 150ms ease;
	transform: rotate(${({ opened }) => (opened ? 180 : 0)}deg);
`

type Locale = 'en' | 'de' | 'he' | 'fa-IR'

function LanguagePicker() {
	const { t } = useTranslation('common')
	const [opened, setOpened] = useState(false)

	const router = useRouter()
	const locales = (router.locales ?? []) as Locale[]
	const activeLocale = router.locale as Locale

	return (
		<Base
			width="target"
			withinPortal
			onOpen={() => setOpened(true)}
			onClose={() => setOpened(false)}
		>
			<Menu.Target>
				<Container opened={opened}>
					<Group spacing="xs">
						<Flag code={t(`countryCode.${activeLocale}`)} width={22} height={22} />
						<span>{t(`lang.${activeLocale}`)}</span>
					</Group>
					<Icon opened={opened} />
				</Container>
			</Menu.Target>
			<Menu.Dropdown>
				{locales.map((locale) => (
					<Menu.Item
						icon={<Flag code={t(`countryCode.${locale}`)} width={18} height={18} />}
						onClick={() => {
							router.push(router.pathname, router.asPath, { locale })
						}}
						key={locale}
					>
						{t(`lang.${locale}`)}
					</Menu.Item>
				))}
			</Menu.Dropdown>
		</Base>
	)
}

export default LanguagePicker
