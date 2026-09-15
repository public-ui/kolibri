import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import type { InternalButtonProps } from '../../../schema';
import { bem } from '../../../schema/bem-registry';
import { ButtonFC } from '../button/component';
import type { ResolvedButtonProps } from '../button/resolve-props';
import type { FunctionalComponentProps } from '../generic-types';
import { SpanFC } from '../span/component';
import type { BadgeApi } from './api';

const badgeBem = bem.forBlock('kol-badge');
const BEM_CLASS_BADGE__LABEL = badgeBem('label');
const BEM_CLASS_BADGE__SMART_BUTTON = badgeBem('smart-button');

/**
 * `smartButton` and `smartButtonProps` may legitimately be absent — the web component clears them
 * when no button is configured, which `StrictFields` cannot express.
 *
 * `Pick`, not `Omit`: `Omit` over `FunctionalComponentProps` widens every remaining prop, because
 * subtracting from the intersection collapses the precise types into the optional HTML attributes
 * it is intersected with.
 */
type BadgeFCProps = Pick<
	FunctionalComponentProps<BadgeApi>,
	| 'ariaDescriptionId'
	| 'color'
	| 'handleBlur'
	| 'handleClick'
	| 'handleFocus'
	| 'handleMouseDown'
	| 'icons'
	| 'label'
	| 'labelId'
	| 'refSmartButton'
	| 'refTooltip'
> & {
	smartButton?: InternalButtonProps;
	smartButtonProps?: ResolvedButtonProps;
};

/**
 * Root from `bem.forBlock('kol-badge')`, not `BemRootNodeFC`: the badge needs an inline `style`
 * for its colours, and `BemRootNodeFC` forwards only `class` (ARC42 § "BemRootNodeFC Pattern").
 *
 * The trailing `<br />` makes NVDA's read mode treat each badge as one element (#10842). The smart
 * button stays before it in the DOM for tab order and is moved to the end visually by `order: 3`.
 */
export const BadgeFC: FC<BadgeFCProps> = (props) => {
	const {
		ariaDescriptionId,
		color,
		handleBlur,
		handleClick,
		handleFocus,
		handleMouseDown,
		icons,
		label,
		labelId,
		refSmartButton,
		refTooltip,
		smartButton,
		smartButtonProps,
	} = props;
	const hasSmartButton = typeof smartButton === 'object' && smartButton !== null && smartButtonProps !== undefined;

	return (
		<div
			class={badgeBem({ 'has-smart-button': hasSmartButton })}
			style={{
				backgroundColor: color.backgroundColor,
				color: color.foregroundColor,
			}}
		>
			<SpanFC class={BEM_CLASS_BADGE__LABEL} id={hasSmartButton ? labelId : undefined} allowMarkdown icons={icons} label={label} />
			{hasSmartButton && (
				<ButtonFC
					{...smartButtonProps}
					class={BEM_CLASS_BADGE__SMART_BUTTON}
					ariaDescriptionId={ariaDescriptionId}
					handleBlur={handleBlur}
					handleClick={handleClick}
					handleFocus={handleFocus}
					handleMouseDown={handleMouseDown}
					refButton={refSmartButton}
					refTooltip={refTooltip}
				/>
			)}

			<br />
		</div>
	);
};
