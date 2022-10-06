import { Generic } from '@public-ui/core';

/**
 * API
 */
type RequiredProps = unknown;
type OptionalProps = {
	alert: boolean;
	touched: boolean;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
export type Watches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
