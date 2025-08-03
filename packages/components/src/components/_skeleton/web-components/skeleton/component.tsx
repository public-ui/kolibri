import type { EventEmitter, JSX } from '@stencil/core';
import { Component, Event, h, Host, Listen, Method, Prop, Watch } from '@stencil/core';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { SkeletonEmitters, SkeletonListeners, SkeletonMethods, SkeletonRenderProps } from '../../internal/functional-components/skeleton/component';
import { SkeletonFC } from '../../internal/functional-components/skeleton/component';
import { SkeletonController } from '../../internal/functional-components/skeleton/controller';
import type { LabelPropType } from '../../internal/schema/props/label';
import type { NameProp, NamePropType } from '../../internal/schema/props/name';
import type { ShowProp, ShowPropType } from '../../internal/schema/props/show';

type Props = NameProp & ShowProp;

@Component({
	tag: 'kol-skeleton',
	shadow: true,
})
export class KolSkeleton implements WebComponentInterface<SkeletonRenderProps, Props, SkeletonEmitters, SkeletonMethods, SkeletonListeners> {
	private controller = new SkeletonController<KolSkeleton>(this);

	public label: LabelPropType = 'Label';

	@Prop()
	public _name!: NamePropType;

	public name: NamePropType = '';

	@Watch('name')
	public watchName(value?: NamePropType): void {
		this.controller.watchName(value);
	}

	@Prop()
	public _show?: ShowPropType;

	public show: ShowPropType = false;

	@Watch('show')
	public watchShow(value?: ShowPropType): void {
		this.controller.watchShow(value);
	}

	@Method()
	public focusButton(): Promise<void> {
		this.controller.focusButton();
		return Promise.resolve();
	}

	@Listen('keydown')
	public handleKeyDown(event: KeyboardEvent): void {
		if (event.key === 'Enter' || event.key === ' ') {
			this.controller.handleClick();
		}
	}

	@Event() public loaded!: EventEmitter<number>;

	@Method()
	public toggle(): Promise<void> {
		this.controller.toggle();
		return Promise.resolve();
	}

	@Listen('keydown', { target: 'window' })
	public onKeydown(event: KeyboardEvent): void {
		this.controller.onKeydown(event);
	}

	public componentWillLoad(): void {
		this.controller.componentWillLoad({
			label: this.label,
			name: this.name,
			show: this.show,
		});
	}

	public render(): JSX.Element {
		return (
			<Host>
				<SkeletonFC
					label={this.label}
					name={this.name}
					handleClick={this.controller.handleClick}
					onLoaded={this.loaded}
					show={this.show}
					refButton={this.controller.setButtonRef}
				/>
			</Host>
		);
	}
}
