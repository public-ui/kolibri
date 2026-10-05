import { h, type FunctionalComponent as FC } from '@stencil/core';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import { FormFieldFC, isLabelShownAsTooltip, type FormFieldFCProps } from '../../internal/functional-components/form-field/component';
import { TooltipBehavior } from '../../internal/functional-components/tooltip/behavior';
import { buildBadgeTextString } from '../../schema';
import { createRelatedUniqueId } from '../../utils/dev.utils';

const formFieldTooltipBehaviorPool = new Map<string, TooltipBehavior>();

const getFormFieldTooltipBehavior = (id: string): TooltipBehavior => {
	const tooltipBehavior = formFieldTooltipBehaviorPool.get(id);
	if (tooltipBehavior) {
		return tooltipBehavior;
	}

	const nextTooltipBehavior = new TooltipBehavior(BaseWebComponent.stateLess);
	nextTooltipBehavior.componentWillLoad({ label: '' });
	formFieldTooltipBehaviorPool.set(id, nextTooltipBehavior);
	return nextTooltipBehavior;
};

const destroyFormFieldTooltipBehavior = (id: string): void => {
	const tooltipBehavior = formFieldTooltipBehaviorPool.get(id);
	if (tooltipBehavior) {
		tooltipBehavior.destroy();
		formFieldTooltipBehaviorPool.delete(id);
	}
};

/** Props of the legacy form fields; `FormFieldFC` receives them through the adapter below. */
export type FormFieldProps = Omit<FormFieldFCProps, 'refInput' | 'refTooltip'>;

/**
 * Adapter of the legacy form fields to `FormFieldFC`, removed once no legacy field is left. It keeps
 * the tooltip behavior of each field in the pool above, because a functional component has no
 * lifecycle; a migrated field owns its tooltip behavior itself.
 */
const KolFormFieldFc: FC<FormFieldProps> = (props, children) => {
	const { id, label, hideLabel, renderNoTooltip, accessKey, shortKey, tooltipAlign, ...other } = props;
	const tooltipBehavior = isLabelShownAsTooltip({ hideLabel, label, renderNoTooltip }) ? getFormFieldTooltipBehavior(id) : undefined;

	if (tooltipBehavior) {
		tooltipBehavior.watchAlign(tooltipAlign);
		tooltipBehavior.watchBadgeText(buildBadgeTextString(accessKey, shortKey) || '');
		tooltipBehavior.watchId(createRelatedUniqueId(id, 'label'));
		tooltipBehavior.watchLabel(label);
	} else {
		destroyFormFieldTooltipBehavior(id);
	}

	return (
		<FormFieldFC
			{...other}
			id={id}
			label={label}
			hideLabel={hideLabel}
			renderNoTooltip={renderNoTooltip}
			accessKey={accessKey}
			shortKey={shortKey}
			tooltipAlign={tooltipAlign}
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
		</FormFieldFC>
	);
};

export default KolFormFieldFc;
