import * as React from 'react';
import { KolAccordion, KolNav } from '@public-ui/react';
import { useMobile } from '../hooks/useMobile';
import type { Routes } from '../shares/types';
import { useLocation } from 'react-router-dom';
import type { ButtonOrLinkOrTextWithChildrenProps } from '@public-ui/components';

type NavigationProps = {
	routes: Routes;
};

function buildLinks(routes: Routes, pathname: string, parentName?: string): ButtonOrLinkOrTextWithChildrenProps[] {
	if (!routes) {
		return [];
	}

	return Object.entries(routes).map(([name, children]) => {
		return {
			_href: parentName ? `#/${parentName}/${name}` : '',
			_active: parentName && `/${parentName}/${name}` === pathname,
			_label: name,
			_children: buildLinks(children as Routes, pathname, name),
		} as ButtonOrLinkOrTextWithChildrenProps;
	});
}

function ComponentNavContainer({ children }: { children?: React.ReactNode }): React.ReactNode {
	const isMobile = useMobile();

	return isMobile ? (
		<KolAccordion _label="Alle Komponenten" class="mt">
			{children}
		</KolAccordion>
	) : (
		<div className="mt scrollable-container">{children}</div>
	);
}

function Navigation({ routes }: NavigationProps): React.ReactNode {
	const { pathname } = useLocation();

	return (
		<ComponentNavContainer>
			<KolNav _label="Sitemap" _links={buildLinks(routes, pathname)} class="block" />
		</ComponentNavContainer>
	);
}

export default Navigation;
