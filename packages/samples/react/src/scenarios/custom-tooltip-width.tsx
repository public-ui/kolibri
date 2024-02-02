import type { FC } from 'react';
import React from 'react';

import { KolButton } from '@public-ui/react';

export const CustomTooltipWidth: FC = () => (
	<KolButton _label="Tooltip mit fixer Breite" _hideLabel style={{ '--kol-tooltip-width': '400px' }} _icons="codicon codicon-reactions"></KolButton>
);
