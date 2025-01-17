import * as countryFlagIcons from 'country-flag-icons/react/3x2';
import { type FC } from 'react';

import { countries } from 'country-flag-icons';

export type CountryCode = keyof typeof countryFlagIcons;

type FlagIconProps = countryFlagIcons.Props & { countryCode: CountryCode };

export const FlagIcon: FC<FlagIconProps> = ({ countryCode, ...props }) => {
  if (!countries.includes(countryCode)) {
    console.error(
      `Invalid country code: ${countryCode} was provided to FlagIcon`,
    );
    return null;
  }
  const Flag = countryFlagIcons[countryCode];
  return <Flag {...props} />;
};
