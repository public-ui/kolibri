import React from 'react';
import { KolLink } from '@public-ui/react';

import { FC } from 'react';

export const LinkTarget: FC = () => (
	<div className="d-flex gap-4">
		<KolLink _href="#" _label="Ich bin ein Link ohne Target" />
		<KolLink _href="#" _label="Ich bin ein Link mit Target (_self)" _target="_self" />
		<KolLink _href="#" _label="Ich bin ein Link mit Target (_blank)" _target="_blank" />
		<KolLink _href="#" _icon="codicon codicon-home" _iconOnly _label="Ich bin ein Link ohne Target" />
		<KolLink _href="#" _icon="codicon codicon-home" _iconOnly _label="Ich bin ein Link mit Target (_self)" _target="_self" />
		<KolLink _href="#" _icon="codicon codicon-home" _iconOnly _label="Ich bin ein Link mit Target (_blank)" _target="_blank" />
	</div>
);
