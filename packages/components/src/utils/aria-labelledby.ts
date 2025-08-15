import { Log } from '../schema';

export type HostInternals = {
	ariaLabelledByElements: HTMLElement[];
};

const resolveTargets = (host: HTMLElement | undefined, value?: string): HTMLElement[] => {
	const ids = (value ?? '').trim().split(/\s+/).filter(Boolean);
	if (!ids.length) return [];
	const root = host?.getRootNode({ composed: true }) as Document | ShadowRoot | undefined;
	const getById = (id: string): HTMLElement | null => {
		return (root as Document)?.getElementById?.(id) || document.getElementById(id);
	};
	return ids.map(getById).filter((el): el is HTMLElement => !!el);
};

export const handleAriaLabelledBy = (host: HTMLElement | undefined, internals: HostInternals | undefined, value?: string): void => {
	if (internals) {
		internals.ariaLabelledByElements = resolveTargets(host, value);
		if (internals?.ariaLabelledByElements?.length) {
			Log.info(['Experimental feature for linking aria-labelledby to an external caption.', host, internals.ariaLabelledByElements], {
				forceLog: true,
			});
		}
	}
};

export const attachInternalsWithAria = (host: HTMLElement | undefined, value?: string): HostInternals | undefined => {
	const attach = (host as unknown as { attachInternals?: () => HostInternals }).attachInternals;
	if (attach) {
		const internals = attach.call(host);
		handleAriaLabelledBy(host, internals, value);
		return internals;
	}
	return undefined;
};
