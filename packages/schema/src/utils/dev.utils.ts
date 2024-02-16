let WINDOW: Window | null = null;
let DOCUMENT: Document | null = null;

export const configKoliBri = (window: Window): void => {
	if (window instanceof Window) {
		WINDOW = window;
		if (WINDOW.document instanceof Document) {
			DOCUMENT = window.document;
		} else {
			console.warn(`The given Window has no valid Document.`);
		}
	} else {
		console.warn(`The given Window is not valid.`);
	}
};

export const getWindow = (): Window => (WINDOW || typeof window === 'undefined' ? (null as unknown as Window) : window);
export const getDocument = (): Document => (DOCUMENT || typeof getWindow().document === 'undefined' ? (null as unknown as Document) : getWindow().document);

let META_CONFIG: string | null = null;
let DEV_MODE: boolean | null = null;
let EXPERIMENTAL_MODE: boolean | null = null;
let COLOR_CONTRAST_ANALYSIS: boolean | null = null;

export const getDevMode = (): boolean => DEV_MODE === true;
export const getExperimentalMode = (): boolean => EXPERIMENTAL_MODE === true;
export const getColorContrastAnalysis = (): boolean => COLOR_CONTRAST_ANALYSIS === true;

export const initMeta = (): void => {
	if (DEV_MODE === null && EXPERIMENTAL_MODE === null && COLOR_CONTRAST_ANALYSIS === null) {
		const meta = getDocument().querySelector('meta[name="kolibri"]');
		if (meta && meta.hasAttribute('content')) {
			META_CONFIG = meta.getAttribute('content');
			if (typeof META_CONFIG === 'string') {
				DEV_MODE = META_CONFIG.includes('dev-mode=true');
				EXPERIMENTAL_MODE = META_CONFIG.includes('experimental-mode=true');
				COLOR_CONTRAST_ANALYSIS = META_CONFIG.includes('color-contrast-analysis=true');
			}
		}
	} else {
		console.warn(`You can only initialize DEV_MODE and COLOR_CONTRAST_ANALYSIS once.`);
	}
};
