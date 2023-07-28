import { Generic } from '@a11y-ui/core';

type RequiredProps = unknown;
type OptionalProps = {
	alert: boolean;
	touched: boolean;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
export type Watches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
