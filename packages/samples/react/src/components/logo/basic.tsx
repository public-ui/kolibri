import React, { FC } from 'react';
import { KolLogo } from '@public-ui/react';
import { Bundesministerium } from '@public-ui/components';

export const LogoBasic: FC = () => <KolLogo className="w-50%" _org={Bundesministerium['Die Bundesregierung']} />;
