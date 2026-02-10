import type { EventEmitter, JSX } from '@stencil/core';
import { Component, Event, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';
import { Log } from '../../../../schema';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { SkeletonApi } from '../../internal/functional-components/skeleton/api';
import { SkeletonFC } from '../../internal/functional-components/skeleton/component';
import { SkeletonController } from '../../internal/functional-components/skeleton/controller';

@Component({
	tag: 'kol-skeleton',
	shadow: true,
})
export class KolSkeleton implements WebComponentInterface<SkeletonApi> {
	private readonly ctrl = new SkeletonController(this);

	/**
	 * Focuses the interactive element of the component.
	 */
	@Method()
	public async focus(): Promise<void> {
		return Promise.resolve(this.ctrl.focus());
	}

	/**
	 * Toggles the visibility of the skeleton component.
	 */
	@Method()
	public async toggle(): Promise<void> {
		return Promise.resolve(this.ctrl.toggle());
	}

	/**
	 * Sets the label of the skeleton component.
	 */
	@Prop()
	public _count?: number | string;

	@Watch('_count')
	public watchCount(value?: number | string): void {
		this.ctrl.watchCount(value);
	}

	/**
	 * Sets the name of the skeleton component.
	 */
	@Prop()
	public _name!: string;

	@Watch('_name')
	public watchName(value?: string): void {
		this.ctrl.watchName(value);
	}

	/**
	 * Sets the label of the skeleton component.
	 */
	@Prop()
	public _label: string = 'Label';

	@Watch('_label')
	public watchLabel(value?: string): void {
		this.ctrl.watchLabel(value);
	}

	@State()
	public label: string = 'Label';

	@State()
	public show: boolean = true;

	@State()
	public count: number = 0;

	@Listen('keydown')
	public handleKeyDown(event: KeyboardEvent): void {
		if (event.key === 'Enter' || event.key === ' ') {
			Log.debug('button pressed');
			this.ctrl.handleClick();
		}
	}

	/**
	 * Emitted when the skeleton has finished loading.
	 */
	@Event() public loaded!: EventEmitter<number>;

	@Listen('keydown', { target: 'window' })
	public onKeydown(event: KeyboardEvent): void {
		this.ctrl.onKeydown(event);
	}

	public componentWillLoad(): void {
		this.watchLabel(this._label);
		this.ctrl.componentWillLoad({
			count: this._count,
			name: this._name,
		});

		// Set up the callback for emitting loaded events
		this.ctrl.setOnLoadedCallback((count: number) => {
			this.loaded.emit(count);
		});
	}

	public disconnectedCallback(): void {
		this.ctrl.destroy();
	}

	public render(): JSX.Element {
		const { count, name } = this.ctrl.getProps();
		const { label, show } = this;
		return (
			<Host>
				<SkeletonFC
					count={count}
					label={label}
					name={name}
					handleClick={this.ctrl.handleClick}
					onLoaded={this.loaded}
					show={show}
					refButton={this.ctrl.setButtonRef}
				/>
			</Host>
		);
	}
}
