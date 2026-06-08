/**
 * Minimal ElementInternals subset for ariaLabelledByElements.
 *
 * Browser support note (as of 2025):
 *   ElementInternals.ariaLabelledByElements is part of the Accessible Object Model (AOM) spec.
 *   It resolves cross-shadow-boundary accessible names that plain aria-labelledby IDREFs cannot
 *   express. Desktop screen readers (NVDA + Chrome, JAWS + Chrome) follow the reference chain
 *   correctly. Mobile screen readers (TalkBack on Android, VoiceOver on iOS) do not yet
 *   propagate element references through the Android/iOS accessibility APIs — they see the
 *   table without a label. This is a Chrome/TalkBack limitation, not a bug in this code.
 *   Users who require TalkBack support today should fall back to the `_label` prop.
 */
export type HostInternals = {
	role: string | null;
	ariaLabelledByElements: HTMLElement[];
	ariaDetailsElements?: HTMLElement[];
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
		// Fallback for detached / SSR contexts — guard avoids ReferenceError outside browsers.
		return typeof document !== 'undefined' ? document.getElementById(id) : null;
	};
	return ids.map(getById).filter((el): el is HTMLElement => !!el);
};

export const attachInternals = (host: HTMLElement | undefined): HostInternals | undefined => {
	// Stencil's HTMLElement typing does not expose attachInternals here.
	const attach = (host as unknown as { attachInternals?: () => HostInternals }).attachInternals;
	if (!attach) return undefined;
	try {
		const internals = attach.call(host);
		// WARNING: Do not set `internals.role` on the host.
		// It can prevent screen readers from resolving and reading the inner shadow DOM content.
		// Keep semantics on the native inner element instead.
		// internals.role = 'table';
		return internals;
	} catch {
		return undefined;
	}
};
