import type { CountPropType } from '../../schema/props/count';
import { normalizeCount, validateCount } from '../../schema/props/count';
import type { LabelPropType } from '../../schema/props/label';
import type { NamePropType } from '../../schema/props/name';
import { normalizeName, validateName } from '../../schema/props/name';
import { BaseController } from '../base-controller';
import type { ClickButtonController } from '../click-button/controller';
import type { ControllerInterface, WebComponentInterface } from '../generic-types';
import type { SkeletonCallbacks, SkeletonListeners, SkeletonMethods, SkeletonRefs, SkeletonRenderProps, SkeletonRenderStates } from './component';

export class SkeletonController
	extends BaseController<SkeletonRenderProps, SkeletonRenderStates>
	implements ControllerInterface<SkeletonRenderProps, SkeletonCallbacks, SkeletonRefs, SkeletonMethods, SkeletonListeners>
{
	public label: LabelPropType = 'Label';

	public constructor(
		component: WebComponentInterface<Record<never, never>, SkeletonRenderStates>,
		private readonly primaryClickButtonController: ClickButtonController,
		private readonly secondaryClickButtonController: ClickButtonController,
	) {
		super(component, {
			count: 0,
			name: '',
		});
	}

	public componentWillLoad(props: SkeletonRenderProps): void {
		const { count, name } = props;
		this.watchCount(count);
		this.watchName(name);
		this.primaryClickButtonController.componentWillLoad({
			label: this.label,
		});
		this.secondaryClickButtonController.componentWillLoad({
			label: this.label,
		});
	}

	public watchCount(value?: CountPropType): void {
		const normalized = normalizeCount(value);
		if (validateCount(normalized)) {
			this.setProp('count', normalized);
		}
	}

	public watchName(value?: NamePropType): void {
		const normalized = normalizeName(value);
		if (validateName(normalized)) {
			this.setProp('name', normalized);
		}
	}

	public toggle(): void {
		this.setState('show', !this.component.show);
	}

	public onKeydown = (event: KeyboardEvent): void => {
		if (event.key === 'Escape') {
			// eslint-disable-next-line no-console
			console.log('Show should be toggled');
			this.toggle();
		}
		this.primaryClickButtonController.onKeydown(event);
		this.secondaryClickButtonController.onKeydown(event);
	};

	public handlePrimaryClick = (): void => {
		this.setState('eCount', this.component.eCount + 1);
	};

	public handleSecondaryClick = (): void => {
		this.setState('eCount', this.component.eCount + 1);
	};

	public focusPrimaryButton = (): void => {
		this.primaryClickButtonController.focusButton();
	};

	public focusSecondaryButton = (): void => {
		this.secondaryClickButtonController.focusButton();
	};

	public setPrimaryButtonRef = (element?: HTMLButtonElement): void => {
		this.primaryClickButtonController.setButtonRef(element);
	};

	public setSecondaryButtonRef = (element?: HTMLButtonElement): void => {
		this.secondaryClickButtonController.setButtonRef(element);
	};
}
