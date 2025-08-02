import type { LabelPropType } from '../../schema/props/label';
import { labelValidator } from '../../schema/props/label';
import type { NamePropType } from '../../schema/props/name';
import { nameValidator } from '../../schema/props/name';
import type { ShowPropType } from '../../schema/props/show';
import { showValidator } from '../../schema/props/show';
import { BaseController } from '../base-controller';
import { ClickButtonController } from '../click-button/controller';
import type { ControllerInterface, WebComponentInterface } from '../generic-types';
import type { SkeletonCallbacks, SkeletonRefs, SkeletonRenderProps } from './component';

/**
 * Enhanced Skeleton Controller using the new SchemaValidator API.
 * This demonstrates how to use the new validator system for cleaner,
 * more consistent validation and normalization.
 */
export class SkeletonControllerEnhanced<Host extends WebComponentInterface<SkeletonRenderProps>>
	extends BaseController<Host>
	implements ControllerInterface<SkeletonRenderProps, SkeletonCallbacks, SkeletonRefs>
{
	private readonly clickButtonController = new ClickButtonController<Host>(this.component);

	public componentWillLoad(props: SkeletonRenderProps): void {
		const { label, name, show } = props;
		this.watchLabel(label);
		this.watchName(name);
		this.watchShow(show);
	}

	public watchLabel(value?: LabelPropType): void {
		// New API: Single method call handles normalization and validation
		const processedValue = labelValidator.process(value);
		this.setRenderPropsOrStates('label', processedValue);
		this.clickButtonController.watchLabel(processedValue);
	}

	public watchName(value?: NamePropType): void {
		// New API: Validator handles all edge cases and provides better error handling
		const processedValue = nameValidator.process(value);
		this.setRenderPropsOrStates('name', processedValue);
	}

	public watchShow(value?: ShowPropType): void {
		// New API: Consistent interface across all validators
		const processedValue = showValidator.process(value);
		this.setRenderPropsOrStates('show', processedValue);
	}

	public handleClick = (): void => {
		// eslint-disable-next-line no-console
		console.log(this, 'button clicked');

		// Example: Toggle show state using validator
		const currentShow = this.component.show;
		const newShow = showValidator.process(!currentShow);
		this.setRenderPropsOrStates('show', newShow);
	};

	public setButtonRef = (element?: HTMLButtonElement): void => {
		this.clickButtonController.setButtonRef(element);
	};
}
