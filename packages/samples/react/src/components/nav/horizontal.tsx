import React from 'react';
import { KolNav } from '@public-ui/react';

import { FC } from 'react';
import { LINKS } from './links';

export const NavHorizontal: FC = () => <KolNav _label="Main navigation" _links={JSON.stringify(LINKS)} _orientation="horizontal" />;
