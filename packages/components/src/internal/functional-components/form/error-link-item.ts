import type { ErrorListPropType, KolFocusOptions } from '../../../schema';
import { setEventTarget } from '../../../schema';
import { createUniqueId } from '../../../utils/dev.utils';
import { hrefProp, labelWithExpertSlotProp, linkCallbacksProp } from '../../props';
import type { FunctionalComponentProps } from '../generic-types';
import type { LinkApi } from '../link/api';
import { linkPropsConfig } from '../link/api';
import { buildDefaultPropsFromConfig } from '../props-from-config';

type ResolvedLinkProps = FunctionalComponentProps<LinkApi>;

/**
 * One orchestrated error-list entry: the raw error plus everything `LinkFC` needs to render it.
 *
 * The entry is a link with an empty `_href`, the error message as `_label` and an `onClick` that
 * focuses the form control; this factory applies the full link prop surface to these three props.
 *
 * Two pieces of the link orchestration are deliberately absent:
 * - **Tooltip behavior.** `LinkFC` renders a tooltip only for a hidden label, and an error-list
 *   link always shows its message, so `refTooltip` is a no-op here.
 * - **`KolEvent.click`.** The entry dispatches no DOM event: dispatching on the form host would
 *   surface an error-list link as a click of the form.
 */
export type FormErrorLinkItem = {
	/** Fully resolved props for `LinkFC`. */
	fcProps: ResolvedLinkProps;
	/** Focuses the link's anchor element — used by the public `focusErrorList` method. */
	focus(options?: KolFocusOptions): void;
};

export const createFormErrorLinkItem = (error: ErrorListPropType, handleSelector: (selector: string, options?: KolFocusOptions) => void): FormErrorLinkItem => {
	const renderProps = buildDefaultPropsFromConfig(linkPropsConfig) as ResolvedLinkProps;
	let anchorElement: HTMLAnchorElement | undefined;

	// An unset tabindex must not render as `tabindex="0"` — anchors with an href are natively
	// tabbable and the attribute would pin them into the document tab order.
	renderProps.tabIndex = undefined as unknown as ResolvedLinkProps['tabIndex'];

	// The empty href keeps the entry from navigating: it focuses a form control.
	hrefProp.apply('', (href) => (renderProps.href = href));
	labelWithExpertSlotProp.apply(error.message, (label) => (renderProps.label = label));
	linkCallbacksProp.apply(
		{
			onClick: typeof error.selector === 'string' ? (): void => handleSelector(String(error.selector), error.options) : error.selector,
		},
		(on) => (renderProps.on = on),
	);

	renderProps.ariaCurrent = '';
	renderProps.ariaDescriptionId = createUniqueId('aria-description');
	renderProps.expertSlot = error.message === '';

	renderProps.handleAnchorClick = (event: Event): void => {
		const onClick = renderProps.on?.onClick;
		if (typeof onClick === 'function') {
			setEventTarget(event, anchorElement);
			onClick(event, renderProps.href);
		}
	};
	renderProps.refAnchor = (element?: HTMLAnchorElement): void => {
		anchorElement = element;
	};
	renderProps.refTooltip = (): void => undefined;

	return {
		fcProps: renderProps,
		focus: (options?: KolFocusOptions): void => anchorElement?.focus(options),
	};
};
