import { Generic } from '@a11y-ui/core';

import { HeadingLevel } from '../../types/heading-level';
import { PropHasCloser } from '../../types/props/has-closer';
import { PropShow } from '../../types/props/show';
import { KoliBriToastEventCallbacks } from '../../types/toast';
import { AlertType } from '../alert/types';
import { PropLabel } from '../../types/props/label';

type RequiredProps = unknown;
type OptionalProps = {
	alert: boolean;
	/**
	 * @deprecated Use label.
	 */
	heading: string;
	level: HeadingLevel;
	on: KoliBriToastEventCallbacks;
	showDuration: number;
	type: AlertType;
} & PropHasCloser &
	PropShow &
	PropLabel;
export type KoliBriToastProps = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type KoliBriToastStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriToastAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
