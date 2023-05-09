import { useState } from 'react'
import { createStyles, UnstyledButton, Menu, Group, rem } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'

import Flag from 'react-world-flags'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

const useStyles = createStyles((theme, { opened }: { opened: boolean }) => ({
	control: {
		width: rem(200),
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: `${theme.spacing.xs} ${theme.spacing.md}`,
		borderRadius: theme.radius.md,
		border: `${rem(1)} solid ${theme.colors.gray[2]}`,
		transition: 'background-color 150ms ease',
		backgroundColor: opened ? theme.colors.gray[0] : theme.white,

		'&:hover': {
			backgroundColor: theme.colors.gray[0],
		},
	},

	label: {
		fontWeight: 500,
		fontSize: theme.fontSizes.sm,
	},

	icon: {
		transition: 'transform 150ms ease',
		transform: opened ? 'rotate(180deg)' : 'rotate(0deg)',
	},
}))

type Locale = 'en' | 'de' | 'he' | 'fa-IR'

export function LanguagePicker() {
	const { t } = useTranslation('common')
	const [opened, setOpened] = useState(false)
	const { classes } = useStyles({ opened })

	const router = useRouter()
	const locales = (router.locales ?? []) as Locale[]
	const activeLocale = router.locale as Locale

	return (
		<Menu
			onOpen={() => setOpened(true)}
			onClose={() => setOpened(false)}
			radius="md"
			width="target"
			withinPortal
		>
			<Menu.Target>
				<UnstyledButton className={classes.control}>
					<Group spacing="xs">
						<Flag code={t(`countryCode.${activeLocale}`)} width={22} height={22} />
						<span className={classes.label}>{t(`lang.${activeLocale}`)}</span>
					</Group>
					<IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
				</UnstyledButton>
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
		</Menu>
	)
}
