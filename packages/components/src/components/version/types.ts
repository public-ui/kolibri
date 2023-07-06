import { Generic } from '@a11y-ui/core';

import { PropLabel } from '../../types/props/label';

type RequiredProps = unknown;
type OptionalProps = PropLabel & {
	/**
	 * @deprecated
	 */
	version: string;
};
export type KoliBriVersionProps = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = PropLabel;
type OptionalStates = {
	/**
	 * @deprecated
	 */
	version: string;
};

export type KoliBriVersionStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriVersionAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
