import type { NamePropType } from '../../schema/props/name';
import { normalizeName, validateName } from '../../schema/props/name';
import type { ShowPropType } from '../../schema/props/show';
import { normalizeShow, validateShow } from '../../schema/props/show';
import { BaseController } from '../base-controller';
import { ClickButtonController } from '../click-button/controller';
import type { ControllerInterface } from '../generic-types';
import type { SkeletonCallbacks, SkeletonRefs, SkeletonRenderDelegatedProps, SkeletonRenderOwnProps } from './component';

export class SkeletonController<Props extends SkeletonRenderDelegatedProps & SkeletonRenderOwnProps>
	extends BaseController<Props>
	implements ControllerInterface<SkeletonRenderDelegatedProps, SkeletonRenderOwnProps, SkeletonCallbacks, SkeletonRefs>
{
	private readonly clickButtonController = new ClickButtonController<Props>(this.component);

	public componentWillLoad(): void {
		this.delegateWatchLabel(this.component.label);
		this.watchName(this.component.name);
		this.watchShow(this.component.show);
	}

	public delegateWatchLabel(value?: NamePropType): void {
		this.clickButtonController.watchLabel(value);
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
