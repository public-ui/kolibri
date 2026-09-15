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
 * `smartButton` is the one render prop that may legitimately be absent: the web component clears
 * it when no button is configured, which `StrictFields` cannot express. `smartButtonProps` carries
 * the same configuration already normalized for `ButtonFC` and is absent for the same reason.
 *
 * Listed with `Pick` rather than subtracted with `Omit`: `Omit` over `FunctionalComponentProps`
 * widens every remaining prop (`ariaDescriptionId` came out as `string | boolean | undefined`),
 * because subtracting from the intersection collapses the precise state and callback types into
 * the optional HTML attributes it is intersected with. Naming the keys keeps them exact, and
 * prop drift against `BadgeApi` still fails the build.
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
 * The root node is built from `bem.forBlock('kol-badge')` rather than `BemRootNodeFC`: the badge
 * paints its colours as an inline `style`, and `BemRootNodeFC` forwards only `class`. ARC42
 * § "BemRootNodeFC Pattern" covers this case — the root uses the same typed schema either way.
 *
 * The children order is `span` (label), `button` (the smart button, pushed last by `order: 3`) and
 * a trailing `<br />`, which makes NVDA's read mode treat each badge as one element. The `<br />`
 * and the `<div>` root come from the badge read-mode fix on develop (#10842); the button's DOM
 * position stays before it, so the tab order is unaffected.
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
