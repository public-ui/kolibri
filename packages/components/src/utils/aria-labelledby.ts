/**
 * Minimal ElementInternals subset for ariaLabelledByElements.
 */
export type HostInternals = {
	ariaLabelledByElements: HTMLElement[];
};

const escapeCssIdentifier = (value: string): string => {
	if (globalThis.CSS?.escape) {
		return globalThis.CSS.escape(value);
	}

	return value.replace(/[^a-zA-Z0-9_-]/g, '\\$&');
};

export const resolveTargets = (host: HTMLElement | undefined, value?: string): HTMLElement[] => {
	const ids = (value ?? '').trim().split(/\s+/).filter(Boolean);
	if (!ids.length) return [];
	// Scope the lookup to the host's current tree.
	const root = host?.getRootNode() as Document | ShadowRoot | undefined;
	const getById = (id: string): HTMLElement | null => {
		if (root instanceof Document) return root.getElementById(id);
		if (root instanceof ShadowRoot) return root.querySelector(`#${escapeCssIdentifier(id)}`);
		return document.getElementById(id);
	};
	return ids.map(getById).filter((el): el is HTMLElement => !!el);
};

export const attachInternals = (host: HTMLElement | undefined): HostInternals | undefined => {
	// Stencil's HTMLElement typing does not expose attachInternals here.
	const attach = (host as unknown as { attachInternals?: () => HostInternals }).attachInternals;
	return attach ? attach.call(host) : undefined;
};
