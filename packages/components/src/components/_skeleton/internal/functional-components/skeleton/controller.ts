import { Log } from '../../../../../schema';
import { countProp, type CountPropType } from '../../schema/props/count';
import { labelProp, type LabelPropType } from '../../schema/props/label';
import { nameProp, type NamePropType } from '../../schema/props/name';
import { BaseController } from '../base-controller';
import { ClickButtonController } from '../click-button/controller';
import type { ControllerInterface, ResolvedProps } from '../generic-types';
import type { SkeletonApi } from './api';

export class SkeletonController extends BaseController<ResolvedProps<SkeletonApi>, SkeletonApi['States']> implements ControllerInterface<SkeletonApi> {
	private readonly clickButtonCtrl: ClickButtonController;
	private intervalId?: NodeJS.Timeout;

	public constructor(states: SkeletonApi['States']) {
		super(states, {
			count: 0,
			name: '',
		});

		/**
		 * hier muss irgendein handling rein
		 */
		this.clickButtonCtrl = new ClickButtonController({});
		this.startLoadedEventInterval();
	}

	public componentWillLoad(props: ResolvedProps<SkeletonApi>): void {
		const { count, name } = props;
		this.watchCount(count);
		this.watchName(name);
		this.watchLabel(this.component.label);
		this.clickButtonCtrl.componentWillLoad({
			label: this.component.label,
		});
	}

	public watchCount(value?: CountPropType): void {
		const count = countProp.normalize(value);
		if (countProp.validate(count)) {
			this.setProp('count', count);
			this.setState('count', count);
		}
	}

	public watchName(value?: NamePropType): void {
		const name = nameProp.normalize(value);
		if (nameProp.validate(name)) {
			this.setProp('name', name);
		}
	}

	public watchLabel(value?: LabelPropType): void {
		const label = labelProp.normalize(value);
		if (labelProp.validate(label)) {
			this.setState('label', label);
			this.clickButtonCtrl.watchLabel(label);
		}
	}

	public toggle(): void {
		this.setState('show', !this.component.show);
	}

	public onKeydown = (event: KeyboardEvent): void => {
		if (event.key === 'Escape') {
			// eslint-disable-next-line no-console
			console.log('Show should be toggled');
			void this.toggle();
		}
	};

	public handleClick = (): void => {
		Log.debug('Button clicked, count should be increased');
		const { count } = this.getProps();
		const nextCount = count + 1;
		this.setProp('count', nextCount);
		this.setState('count', nextCount);
	};

	public focus(): void {
		return this.clickButtonCtrl.focus();
	}

	public setButtonRef = (element?: HTMLButtonElement): void => {
		this.clickButtonCtrl.setButtonRef(element);
	};

	private startLoadedEventInterval(): void {
		// Emit loaded event every 2 seconds with current count value
		this.intervalId = setInterval(() => {
			const { count } = this.getProps();
			this.emitLoaded(count);
		}, 2000);
	}

	private emitLoaded(count: number): void {
		// This method will be used by the web component to emit the loaded event
		// The web component needs to call this method to actually emit the event
		// We use a callback approach to let the web component handle the emission
		if (this.onLoadedCallback) {
			this.onLoadedCallback(count);
		}
	}

	private onLoadedCallback?: (count: number) => void;

	public setOnLoadedCallback(callback: (count: number) => void): void {
		this.onLoadedCallback = callback;
	}

	public destroy(): void {
		if (this.intervalId) {
			clearInterval(this.intervalId);
			this.intervalId = undefined;
		}
	}
}
