import React from 'react';
import { KolAlert, KolButtonLink } from '@public-ui/react';

import { FC } from 'react';

export const ButtonLinkTarget: FC = () => (
	<div className="grid gap-4">
		<KolAlert _type="info">Bei einem semantischen Button der als Link dargestellt wird, gibt es kein Target!</KolAlert>
		<KolButtonLink _href="#" _label="Ich bin ein Link ohne Target" />
		<KolButtonLink _href="#" _label="Ich bin ein Link mit Target (_self)" _target="_self" />
		<KolButtonLink _href="#" _label="Ich bin ein Link mit Target (_blank)" _target="_blank" />
		<KolButtonLink _href="#" _icon="codicon codicon-home" _iconOnly _label="Ich bin ein Link ohne Target" />
		<KolButtonLink _href="#" _icon="codicon codicon-home" _iconOnly _label="Ich bin ein Link mit Target (_self)" _target="_self" />
		<KolButtonLink _href="#" _icon="codicon codicon-home" _iconOnly _label="Ich bin ein Link mit Target (_blank)" _target="_blank" />
	</div>
);
