import { normalizeLabel, validateLabel } from '../../schema/props/label';
import type { NamePropType } from '../../schema/props/name';
import { normalizeName, validateName } from '../../schema/props/name';
import type { ShowPropType } from '../../schema/props/show';
import { normalizeShow, validateShow } from '../../schema/props/show';
import { BaseController } from '../base-controller';
import { ClickButtonController } from '../click-button/controller';
import type { ControllerInterface } from '../generic-types';
import type { SkeletonCallbacks, SkeletonRefs, SkeletonRenderProps } from './component';

export class SkeletonController<Props extends SkeletonRenderProps>
	extends BaseController<Props>
	implements ControllerInterface<SkeletonRenderProps, SkeletonCallbacks, SkeletonRefs>
{
	private readonly clickButtonController = new ClickButtonController<Props>(this.component);

	public componentWillLoad(): void {
		this.watchLabel(this.component.label);
		this.watchName(this.component.name);
		this.watchShow(this.component.show);
	}

	public watchLabel(value?: NamePropType): void {
		const normalized = normalizeLabel(value);
		if (validateLabel(normalized)) {
			this.setRenderPropsOrStates('label', normalized);
		}
	}

	public watchName(value?: NamePropType): void {
		const normalized = normalizeName(value);
		if (validateName(normalized)) {
			this.setRenderPropsOrStates('name', normalized);
		}
	}

	public watchShow(value?: ShowPropType): void {
		const normalized = normalizeShow(value);
		if (validateShow(normalized)) {
			this.setRenderPropsOrStates('show', normalized);
		}
	}

	public handleClick = (): void => {
		// eslint-disable-next-line no-console
		console.log(this, 'button clicked');
	};

	public setButtonRef = (element?: HTMLButtonElement): void => {
		this.clickButtonController.setButtonRef(element);
	};
}
