import { h, type FunctionalComponent as FC } from '@stencil/core';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import { FieldControlFC, isFieldControlLabelShownAsTooltip, type FieldControlFCProps } from '../../internal/functional-components/form-field/field-control';
import { TooltipBehavior } from '../../internal/functional-components/tooltip/behavior';
import { buildBadgeTextString } from '../../schema';
import { createRelatedUniqueId } from '../../utils/dev.utils';

const fieldControlTooltipBehaviorPool = new Map<string, TooltipBehavior>();

const getFieldControlTooltipBehavior = (id: string): TooltipBehavior => {
	const tooltipBehavior = fieldControlTooltipBehaviorPool.get(id);
	if (tooltipBehavior) {
		return tooltipBehavior;
	}

	const nextTooltipBehavior = new TooltipBehavior(BaseWebComponent.stateLess);
	nextTooltipBehavior.componentWillLoad({ label: '' });
	fieldControlTooltipBehaviorPool.set(id, nextTooltipBehavior);
	return nextTooltipBehavior;
};

const destroyFieldControlTooltipBehavior = (id: string): void => {
	const tooltipBehavior = fieldControlTooltipBehaviorPool.get(id);
	if (tooltipBehavior) {
		tooltipBehavior.destroy();
		fieldControlTooltipBehaviorPool.delete(id);
	}
};

/** Props of the legacy checkbox and radio fields; `FieldControlFC` receives them through the adapter below. */
export type FieldControlProps = Omit<FieldControlFCProps, 'labelProps' | 'readOnly' | 'refInput' | 'refTooltip'> & {
	readonly?: boolean;
	fieldControlLabelProps?: FieldControlFCProps['labelProps'];
};

/**
 * Adapter of the legacy checkbox and radio fields to `FieldControlFC`, removed once both are
 * migrated. It keeps the tooltip behavior of each control in the pool above, because a functional
 * component has no lifecycle.
 */
const KolFieldControlFc: FC<FieldControlProps> = (props, children) => {
	const { id, label, hideLabel, renderNoTooltip, accessKey, shortKey, tooltipAlign, readonly, fieldControlLabelProps, ...other } = props;
	const tooltipBehavior = isFieldControlLabelShownAsTooltip({ hideLabel, label, renderNoTooltip }) ? getFieldControlTooltipBehavior(id) : undefined;

	if (tooltipBehavior) {
		tooltipBehavior.watchAlign(tooltipAlign);
		tooltipBehavior.watchBadgeText(buildBadgeTextString(accessKey, shortKey) || '');
		tooltipBehavior.watchId(createRelatedUniqueId(id, 'label'));
		tooltipBehavior.watchLabel(label);
	} else {
		destroyFieldControlTooltipBehavior(id);
	}

	return (
		<FieldControlFC
			{...other}
			id={id}
			label={label}
			hideLabel={hideLabel}
			renderNoTooltip={renderNoTooltip}
			accessKey={accessKey}
			shortKey={shortKey}
			tooltipAlign={tooltipAlign}
			readOnly={readonly}
			labelProps={fieldControlLabelProps}
			refInput={(el?: HTMLDivElement): void => {
				if (tooltipBehavior && el) {
					tooltipBehavior.initContext(el);
					tooltipBehavior.syncListeners(undefined, el, true);
				}
			}}
			refTooltip={(el?: HTMLDivElement): void => {
				tooltipBehavior?.setTooltipElementRef(el);
			}}
		>
			{children}
		</FieldControlFC>
	);
};

export default KolFieldControlFc;
