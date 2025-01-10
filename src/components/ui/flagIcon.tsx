import * as countryFlagIcons from 'country-flag-icons/react/3x2';
import { type FC } from 'react';

import { countries } from 'country-flag-icons';

type FlagIconProps = countryFlagIcons.Props & { countryCode: string };

export const FlagIcon: FC<FlagIconProps> = ({ countryCode, ...props }) => {
  if (!countries.includes(countryCode)) {
    console.error(
      `Invalid country code: ${countryCode} was provided to FlagIcon`,
    );
    return null;
  }
  const Flag = countryFlagIcons[countryCode as keyof typeof countryFlagIcons];
  return <Flag {...props} />;
};
