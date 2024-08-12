import * as React from 'react';
import { KolNav } from '@public-ui/react';

import { LINKS } from '../../components/nav/links';

type NavigationProps = {
	className?: string;
};

function Navigation({ className }: NavigationProps) {
	return (
		<div className={className}>
			<KolNav _label="Main navigation" _links={LINKS} _hasCompactButton _hasIconsWhenExpanded />
		</div>
	);
}

export default Navigation;
