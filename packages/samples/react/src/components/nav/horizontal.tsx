import React from 'react';

import { KolNav } from '@public-ui/react';

import { LINKS } from './links';

import type { FC } from 'react';
export const NavHorizontal: FC = () => <KolNav _label="Main navigation" _links={LINKS} _orientation="horizontal" />;
