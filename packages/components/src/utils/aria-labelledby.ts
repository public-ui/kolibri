const escapeCssIdentifier = (value: string): string => {
	if (globalThis.CSS?.escape) {
		return globalThis.CSS.escape(value);
	}

	return value.replace(/[^a-zA-Z0-9_-]/g, '\\$&');
};

export const resolveTargets = (host: HTMLElement | Element | undefined, value?: string): HTMLElement[] => {
	const ids = (value ?? '').trim().split(/\s+/).filter(Boolean);
	if (!ids.length) return [];
	// Scope the lookup to the host's current tree. The constructor globals are undefined in
	// non-browser environments (Stencil mock-doc), so every instanceof check is guarded.
	const root = host?.getRootNode() as Document | ShadowRoot | undefined;
	const getById = (id: string): HTMLElement | null => {
		if (typeof Document !== 'undefined' && root instanceof Document) return root.getElementById(id);
		if (typeof ShadowRoot !== 'undefined' && root instanceof ShadowRoot) return root.querySelector(`#${escapeCssIdentifier(id)}`);
		// Fallback for detached / SSR contexts — guard avoids ReferenceError outside browsers.
		return typeof document !== 'undefined' ? document.getElementById(id) : null;
	};
	return ids.map(getById).filter((el): el is HTMLElement => !!el);
};
