/**
 * Debug aid for the visual tests: draws an outline around every `data-visual-block` container
 * (see `components/SampleBlock`) so you can see what an element screenshot actually captures.
 * Blocks excluded via SampleBlock's `skipSnapshot` prop are outlined red instead of blue, so it is
 * visible at a glance which sample is captured and which one is only there to be looked at.
 *
 * It is off by default and never ends up in a snapshot:
 * - it is drawn as an `outline`, which takes no space – the layout is identical whether it is on or off,
 * - Playwright starts each run with a fresh browser context, so the stored preference can't leak into it.
 *
 * See `hooks/useVisualBlockOutline` for the URL parameter and the keyboard shortcut.
 */

const ROOT_ATTRIBUTE = 'data-visual-blocks';
const STORAGE_KEY = 'public-ui.sample.visual-blocks';
const SKIPPED_ATTRIBUTE = 'data-visual-block-skipped';
const STYLE_ELEMENT_ID = 'visual-block-outline-style';
const STYLE_CONTENT = `
	html[${ROOT_ATTRIBUTE}] [data-visual-block] {
		outline: 2px solid darkblue;
		outline-offset: 0;
	}
	html[${ROOT_ATTRIBUTE}] [${SKIPPED_ATTRIBUTE}] {
		outline: 2px solid orangered;
		outline-offset: 0;
	}
`;

/**
 * The rule lives here instead of in the host apps' stylesheets (visual-tests app, presentation app),
 * so this debug feature stays in the single package that owns `data-visual-block`.
 */
function ensureStyleElement(): void {
	if (document.getElementById(STYLE_ELEMENT_ID)) {
		return;
	}
	const style = document.createElement('style');
	style.id = STYLE_ELEMENT_ID;
	style.textContent = STYLE_CONTENT;
	document.head.appendChild(style);
}

function isVisualBlockOutlineEnabled(): boolean {
	return document.documentElement.hasAttribute(ROOT_ATTRIBUTE);
}

export function setVisualBlockOutline(enabled: boolean, persist = true): void {
	ensureStyleElement();
	if (enabled) {
		document.documentElement.setAttribute(ROOT_ATTRIBUTE, '');
	} else {
		document.documentElement.removeAttribute(ROOT_ATTRIBUTE);
	}
	if (persist) {
		try {
			localStorage.setItem(STORAGE_KEY, enabled ? '1' : '0');
		} catch {
			// Storage can be unavailable (private mode, blocked cookies) – the outline just won't be remembered.
		}
	}
}

export function toggleVisualBlockOutline(): boolean {
	const enabled = !isVisualBlockOutlineEnabled();
	setVisualBlockOutline(enabled);
	return enabled;
}

export function readStoredVisualBlockOutline(): boolean {
	try {
		return localStorage.getItem(STORAGE_KEY) === '1';
	} catch {
		return false;
	}
}
