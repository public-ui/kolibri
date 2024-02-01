import React from 'react';

import { KolNav } from '@public-ui/react';

import { LINKS } from './links';

import type { FC } from 'react';
export const NavBasic: FC = () => <KolNav class="block w-fit" _label="Main navigation" _links={LINKS} _hasCompactButton />;
