import React from 'react';
import { KolAlert, KolLink } from '@public-ui/react';

type ErrorListPropType = {
	errors: Record<string, string>;
};

export function ErrorList({ errors }: ErrorListPropType) {
	const handleLinkClick = (event: Event) => {
		const href = (event.target as HTMLAnchorElement | undefined)?.href;
		if (href) {
			const hrefUrl = new URL(href);

			const targetElement = document.querySelector<HTMLElement>(hrefUrl.hash);
			if (targetElement && typeof targetElement.focus === 'function') {
				targetElement.focus();
			}
		}
	};

	return (
		<KolAlert _type="error">
			Bitte korrigieren Sie folgende Fehler:
			<nav aria-label="Fehlerliste">
				<ul>
					{Object.entries(errors).map(([field, error]) => (
						<li key={field}>
							<KolLink _href={`#field-${field}`} _label={error} _on={{ onClick: handleLinkClick }} />
						</li>
					))}
				</ul>
			</nav>
		</KolAlert>
	);
}
