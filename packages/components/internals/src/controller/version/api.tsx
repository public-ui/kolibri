import { labelProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

/**
 * Props configuration for the version component.
 *
 * `labelProp` (not `labelWithExpertSlotProp`): the version renders a badge, never an
 * expert slot, and a version string is the sole label — the 2–80 character length guard
 * of `labelProp` is the right contract.
 *
 * Colour and icon of a version badge are fixed, not properties: they are constants of the web
 * component, not render props, so they never appear here.
 */
export const versionPropsConfig = {
	required: [labelProp],
} as const satisfies PropsConfigShape;

export type VersionApi = ApiFromConfig<typeof versionPropsConfig>;
