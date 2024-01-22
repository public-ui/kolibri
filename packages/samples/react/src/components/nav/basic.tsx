import React from 'react';
import { KolNav } from '@public-ui/react';

import { FC } from 'react';
import { LINKS } from './links';

export const NavBasic: FC = () => <KolNav class="block w-fit" _label="Main navigation" _links={LINKS} _hasCompactButton />;
