import type { FC } from 'react';
import React from 'react';

import { Bundesministerium } from '@public-ui/components';
import { KolLogo } from '@public-ui/react';

export const LogoBasic: FC = () => <KolLogo className="w-50%" _org={Bundesministerium['Die Bundesregierung']} />;
