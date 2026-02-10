import { Log } from '../../../../../schema';
import { countProp, labelProp, nameProp, withValidPropValue } from '../../schema/props';
import { BaseController } from '../base-controller';
import { ClickButtonController } from '../click-button/controller';
import type { ControllerInterface, ResolvedInputProps } from '../generic-types';
import type { SkeletonApi } from './api';

export class SkeletonController extends BaseController<SkeletonApi> implements ControllerInterface<SkeletonApi> {
	private readonly clickButtonCtrl: ClickButtonController;
	private intervalId?: ReturnType<typeof setTimeout>;

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

	public componentWillLoad(props: ResolvedInputProps<SkeletonApi>): void {
		const { count, name } = props;
		this.watchCount(count);
		this.watchName(name);
		this.watchLabel(this.component.label);
		this.clickButtonCtrl.componentWillLoad({
			label: this.component.label,
		});
	}

	public watchCount(value?: number | string): void {
		withValidPropValue(countProp, value, (v) => {
			this.setProp('count', v);
			this.setState('count', v);
		});
	}

	public watchName(value?: string): void {
		withValidPropValue(nameProp, value, (v) => {
			this.setProp('name', v);
		});
	}

	public watchLabel(value?: string): void {
		withValidPropValue(labelProp, value, (v) => {
			this.setState('label', v);
			this.clickButtonCtrl.watchLabel(v);
		});
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
