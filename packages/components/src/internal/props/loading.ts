import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Loading prop for lazy-loading behavior of embedded content
 *
 * Description:
 * The loading attribute controls when the browser should start fetching the resource.
 * Lazy loading defers loading of off-screen content until it is near the viewport,
 * improving initial page load performance.
 *
 * Usage (according to W3C HTML specification):
 * - "lazy": Defers loading until the element approaches the viewport
 * - "eager": Loads the resource immediately regardless of viewport position
 * - Default is "lazy" to optimize performance
 *
 * Accessibility:
 * - Lazy loading must not interfere with assistive technology access to content
 * - Content must be available when focused or navigated to via keyboard (WCAG 2.1.1 Keyboard)
 * - Ensure lazy-loaded content does not cause unexpected layout shifts (WCAG 2.3.3 Animation from Interactions)
 *
 * @see https://html.spec.whatwg.org/multipage/urls-and-fetching.html#lazy-loading-attributes
 * @see https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html
 */
const LOADING_OPTIONS = ['eager', 'lazy'] as const;
export type LoadingType = (typeof LOADING_OPTIONS)[number];
export type LoadingProp = SimpleProp<'loading', LoadingType>;

const LOADING_SET: ReadonlySet<string> = new Set(LOADING_OPTIONS);

export const loadingProp = createPropDefinition<LoadingProp>(
	'loading',
	'lazy',
	(value: unknown) => normalizeString(value) as LoadingType,
	(v) => LOADING_SET.has(v),
);
