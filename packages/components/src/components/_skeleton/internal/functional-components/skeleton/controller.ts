import type { LabelPropType } from '../../schema/props/label';
import { normalizeLabel } from '../../schema/props/label';
import type { NamePropType } from '../../schema/props/name';
import { normalizeName } from '../../schema/props/name';
import type { ShowPropType } from '../../schema/props/show';
import { normalizeShow } from '../../schema/props/show';
import { BaseController } from '../base-controller';
import { ClickButtonController } from '../click-button/controller';
import type { ControllerInterface, WebComponentInterface } from '../generic-types';
import type { SkeletonCallbacks, SkeletonEmitters, SkeletonListeners, SkeletonMethods, SkeletonRefs, SkeletonRenderProps } from './component';

export class SkeletonController<
		Host extends WebComponentInterface<SkeletonRenderProps, Record<never, never>, SkeletonEmitters, SkeletonMethods, SkeletonListeners>,
	>
	extends BaseController<Host>
	implements ControllerInterface<SkeletonRenderProps, SkeletonCallbacks, SkeletonRefs, SkeletonMethods, SkeletonListeners>
{
	private readonly clickButtonController = new ClickButtonController<Host>(this.component);

	public componentWillLoad(props: SkeletonRenderProps): void {
		const { label, name, show } = props;
		this.watchLabel(label);
		this.watchName(name);
		this.watchShow(show);
	}

	public watchLabel(value?: LabelPropType): void {
		// Use normalize function for label
		const processedValue = normalizeLabel(value);
		this.setRenderPropsOrStates('label', processedValue);
		this.clickButtonController.watchLabel(processedValue);
	}

	public watchName(value?: NamePropType): void {
		// Use normalize function for name
		const processedValue = normalizeName(value);
		this.setRenderPropsOrStates('name', processedValue);
	}

	public watchShow(value?: ShowPropType): void {
		// Use normalize function for show
		const processedValue = normalizeShow(value);
		this.setRenderPropsOrStates('show', processedValue);
	}

	public toggle(): void {
		this.setRenderPropsOrStates('show', !this.component.show);
	}

	public onKeydown = (event: KeyboardEvent): void => {
		if (event.key === 'Escape') {
			this.setRenderPropsOrStates('show', false);
		}
	};

	public handleClick = (): void => {
		// eslint-disable-next-line no-console
		console.log(this, 'button clicked');
	};

	public focusButton = (): void => {
		this.clickButtonController.focusButton();
	};

	public setButtonRef = (element?: HTMLButtonElement): void => {
		this.clickButtonController.setButtonRef(element);
	};
}
