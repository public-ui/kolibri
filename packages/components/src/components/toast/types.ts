import { Generic } from '@a11y-ui/core';
import { AlertType, HeadingLevel, KoliBriToastEventCallbacks } from '../../components';
import { PropHasCloser, PropShow } from '../../types/props';

type RequiredProps = unknown;
type OptionalProps = {
	alert: boolean;
	heading: string;
	level: HeadingLevel;
	on: KoliBriToastEventCallbacks;
	showDuration: number;
	type: AlertType;
} & PropHasCloser &
	PropShow;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type KoliBriToastStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriToastAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
