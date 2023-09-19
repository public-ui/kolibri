import React, { FC } from 'react';
import { KolLogo } from '@public-ui/react';
import { Bundesministerium } from '@public-ui/components';

export const LogoBasic: FC = () => <KolLogo _org={Bundesministerium['Die Bundesregierung']} style={{ width: 300 }} />;
