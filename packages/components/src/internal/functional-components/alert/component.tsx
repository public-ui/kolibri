import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { getHeadlineTag } from '../../../functional-components/Heading/Heading';
import { translate } from '../../../i18n';
import { bem } from '../../../schema/bem-registry';
import clsx from '../../../utils/clsx';
import { BemRootNodeFC } from '../bem-root-node/component';
import { ButtonFC } from '../button/component';
import type { FunctionalComponentProps } from '../generic-types';
import type { AlertApi } from './api';
import { AlertIconFC } from './icon';

const alertBem = bem.forBlock('kol-alert');
const BEM_CLASS_ALERT__CLOSER = alertBem('closer');
const BEM_CLASS_ALERT__CONTENT = alertBem('content');

/**
 * The closer is a plain button: no role override, and an unset tabindex must not render as
 * `tabindex="0"` — buttons are natively tabbable and the attribute would pin them into the tab
 * order. `kol-button` reaches the same undefined render props via `unsetRenderProp`.
 */
const UNSET_BUTTON_PROP = undefined as never;

/**
 * Renders the alert as a single BEM root: icon, optional heading, optional closer button and the
 * content region.
 *
 * The closer is rendered as `ButtonFC` directly — its BEM root carries both `kol-button` and
 * `kol-alert__closer` on the same element, so theme styles that targeted the closer through a
 * descendant `.kol-button` (or `.kol-button--normal`) now target the compound selector instead.
 * The tooltip behavior for the closer (show on hover/focus) is composed by the web component,
 * which owns `refCloserButton`/`refCloserTooltip` — a plain functional component has no lifecycle
 * to sync the listeners in.
 *
 * All remaining HTML attributes (`id`, `role`, `aria-*`, `ref`, …) are forwarded onto the root
 * node — internal consumers (form, form-field-msg, toast-item) rely on that passthrough.
 */
export const AlertFC: FC<FunctionalComponentProps<AlertApi>> = (props, children) => {
	const {
		alert,
		class: classNames,
		closerAriaDescriptionId,
		handleCloserClick,
		hasCloser,
		headingId,
		label,
		level,
		refCloserButton,
		refCloserTooltip,
		type,
		variant,
		...other
	} = props;

	const translateCloseAlert = translate('kol-close-alert');
	const HeadlineTag = getHeadlineTag(level);

	return (
		<BemRootNodeFC
			block="kol-alert"
			class={classNames}
			modifiers={{
				hasCloser: hasCloser === true,
				[`type-${type}`]: true,
				[`variant-${variant}`]: true,
			}}
			role={alert ? 'alert' : undefined}
			{...other}
		>
			<AlertIconFC type={type} />

			{label.length > 0 && (
				<HeadlineTag
					class={clsx('kol-headline', `kol-headline--${HeadlineTag}`, alertBem('heading', { [`h${level}`]: true }), 'kol-headline--single')}
					id={headingId}
				>
					{label}
				</HeadlineTag>
			)}

			{hasCloser && (
				<ButtonFC
					accessKey=""
					ariaControls=""
					ariaDescription={label.trim()}
					ariaDescriptionId={closerAriaDescriptionId}
					ariaExpanded={UNSET_BUTTON_PROP}
					ariaHasPopup=""
					ariaSelected={UNSET_BUTTON_PROP}
					class={clsx(BEM_CLASS_ALERT__CLOSER, 'kol-close-button')}
					customClass=""
					disabled={false}
					handleBlur={() => undefined}
					handleClick={handleCloserClick}
					handleFocus={() => undefined}
					handleMouseDown={() => undefined}
					hideLabel
					icons={{
						left: {
							icon: 'kolicon-cross',
						},
					}}
					id=""
					inline={false}
					label={translateCloseAlert}
					name=""
					on={{}}
					refButton={refCloserButton}
					refTooltip={refCloserTooltip}
					role={UNSET_BUTTON_PROP}
					shortKey=""
					tabIndex={UNSET_BUTTON_PROP}
					tooltipAlign="left"
					type="button"
					variant={['normal']}
				/>
			)}

			<div aria-describedby={label.length > 0 ? headingId : undefined} class={BEM_CLASS_ALERT__CONTENT}>
				{children}
			</div>
		</BemRootNodeFC>
	);
};
