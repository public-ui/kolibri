import type { LabelPropType } from '../../schema/props/label';
import { normalizeLabel, validateLabel } from '../../schema/props/label';
import type { NamePropType } from '../../schema/props/name';
import { normalizeName, validateName } from '../../schema/props/name';
import type { ShowPropType } from '../../schema/props/show';
import { normalizeShow, validateShow } from '../../schema/props/show';
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
		if (validateLabel(value)) {
			this.setRenderPropsOrStates('label', value);
			this.clickButtonController.watchLabel(value);
		} else {
			const normalized = normalizeLabel(value);
			if (validateLabel(normalized)) {
				this.setRenderPropsOrStates('label', normalized);
				this.clickButtonController.watchLabel(normalized);
			}
		}
	}

	public watchName(value?: NamePropType): void {
		if (validateName(value)) {
			this.setRenderPropsOrStates('name', value);
		} else {
			const normalized = normalizeName(value);
			if (validateName(normalized)) {
				this.setRenderPropsOrStates('name', normalized);
			}
		}
	}

	public watchShow(value?: ShowPropType): void {
		if (validateShow(value)) {
			this.setRenderPropsOrStates('show', value);
		} else {
			const normalized = normalizeShow(value);
			if (validateShow(normalized)) {
				this.setRenderPropsOrStates('show', normalized);
			}
		}
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
