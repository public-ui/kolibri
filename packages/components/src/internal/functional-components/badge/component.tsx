import type { FunctionalComponent as FC, JSX } from '@stencil/core';
import { h } from '@stencil/core';

import { KolButtonWcTag } from '../../../core/component-names';
import type { InternalButtonProps } from '../../../schema';
import { bem } from '../../../schema/bem-registry';
import type { FunctionalComponentProps } from '../generic-types';
import { SpanFC } from '../span/component';
import type { BadgeApi } from './api';

const badgeBem = bem.forBlock('kol-badge');
const BEM_CLASS_BADGE__LABEL = badgeBem('label');
const BEM_CLASS_BADGE__SMART_BUTTON = badgeBem('smart-button');

/**
 * `smartButton` is the one render prop that may legitimately be absent: the web component clears
 * it when no button is configured, which `StrictFields` cannot express.
 */
type BadgeFCProps = Omit<FunctionalComponentProps<BadgeApi>, 'smartButton'> & {
	smartButton?: InternalButtonProps;
};

/**
 * The smart button keeps rendering the transitional `kol-button-wc` element: base and theme SCSS
 * reach the inner button through `.kol-badge__smart-button .kol-button`, which only resolves while
 * the wrapper host node carries the element class (see the themes' `components/badge.scss`).
 */
function renderSmartButton(props: InternalButtonProps, labelId: string, refSmartButton: (element?: HTMLKolButtonWcElement) => void): JSX.Element {
	return (
		<KolButtonWcTag
			ref={refSmartButton}
			class={BEM_CLASS_BADGE__SMART_BUTTON}
			_ariaControls={labelId}
			_ariaDescription={props._ariaDescription}
			_variant={props._variant}
			_customClass={props._customClass}
			_disabled={props._disabled}
			_hideLabel={true}
			_icons={props._icons}
			_id={props._id}
			_label={props._label}
			_on={props._on}
			_tooltipAlign={props._tooltipAlign}
		/>
	);
}

/**
 * The root node is a `<span>`, not `BemRootNodeFC`: a badge is inline content (it sits inside
 * headings, table cells and running text) and `BemRootNodeFC` always renders a `<div>`. ARC42
 * § "BemRootNodeFC Pattern" covers this case — the root is built from the same typed schema via
 * `bem.forBlock('kol-badge')` instead.
 */
export const BadgeFC: FC<BadgeFCProps> = (props) => {
	const { color, icons, label, labelId, refSmartButton, smartButton } = props;
	const hasSmartButton = typeof smartButton === 'object' && smartButton !== null;

	return (
		<span
			class={badgeBem({ 'has-smart-button': hasSmartButton })}
			style={{
				backgroundColor: color.backgroundColor,
				color: color.foregroundColor,
			}}
		>
			<SpanFC class={BEM_CLASS_BADGE__LABEL} id={hasSmartButton ? labelId : undefined} allowMarkdown icons={icons} label={label} />
			{hasSmartButton && renderSmartButton(smartButton, labelId, refSmartButton)}
		</span>
	);
};
