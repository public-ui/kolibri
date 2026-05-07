import { Component, Element, h, Method, Prop, State, Watch } from '@stencil/core';
import type { FocusableElement, LabelPropType, LinkProps, SkipNavAPI, SkipNavStates, Stringified } from '../../schema';
import { validateLabel } from '../../schema';

import { delegateFocus, setFocus } from '../../utils/element-focus';
import { addNavLabel, removeNavLabel } from '../../utils/unique-nav-labels';
import { watchNavLinks } from '../nav/validation';

import type { JSX } from '@stencil/core';
import { LinkFC } from '../../internal/functional-components/link/component';
import { createLinkStateAccess, initLinkControllerFromProps, LinkController } from '../../internal/functional-components/link/controller';

/**
 * The **SkipNav** component renders a hidden navigation that allows keyboard and assistive technology users to skip repetitive navigation sections and jump directly to the main content. It only becomes visible when reached via the Tab key.
 */
@Component({
	tag: 'kol-skip-nav',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolSkipNav implements SkipNavAPI, FocusableElement {
	@Element() private readonly host?: HTMLKolSkipNavElement;

	@State() private _tick = 0;
	private readonly forceRender = () => this._tick++;
	private linkCtrls: LinkController[] = [];

	public render(): JSX.Element {
		return (
			<nav class="kol-skip-nav" aria-label={this.state._label}>
				<ul class="kol-skip-nav__list">
					{this.state._links.map((link: LinkProps, index: number) => {
						const ctrl = this.linkCtrls[index];
						return (
							<li class="kol-skip-nav__list-item" key={index}>
								{ctrl && (
									<LinkFC
										accessKey={ctrl.getRenderProp('accessKey')}
										ariaControls={ctrl.getRenderProp('ariaControls')}
										ariaCurrent={ctrl.getAriaCurrent()}
										ariaCurrentValue={ctrl.getRenderProp('ariaCurrentValue')}
										ariaDescription={ctrl.getRenderProp('ariaDescription')}
										ariaExpanded={ctrl.getRenderProp('ariaExpanded')}
										ariaOwns={ctrl.getRenderProp('ariaOwns')}
										customClass={ctrl.getRenderProp('customClass')}
										disabled={ctrl.getRenderProp('disabled')}
										download={ctrl.getRenderProp('download')}
										hideLabel={ctrl.getRenderProp('hideLabel')}
										href={ctrl.getRenderProp('href')}
										icons={ctrl.getRenderProp('icons')}
										inline={ctrl.getRenderProp('inline')}
										label={ctrl.getRenderProp('label')}
										on={ctrl.getRenderProp('on')}
										role={ctrl.getRenderProp('role')}
										shortKey={ctrl.getRenderProp('shortKey')}
										tabIndex={ctrl.getRenderProp('tabIndex')}
										target={ctrl.getRenderProp('target')}
										tooltipAlign={ctrl.getRenderProp('tooltipAlign')}
										variant={ctrl.getRenderProp('variant')}
										onAnchorClick={ctrl.handleAnchorClick}
										tooltipId={ctrl.getTooltipId()}
										refTooltipFloating={ctrl.setTooltipRef}
										refAnchor={(el) => ctrl.setAnchorRef(el)}
									/>
								)}
							</li>
						);
					})}
				</ul>
			</nav>
		);
	}

	/**
	 * Sets focus on the internal element.
	 */
	@Method()
	public async focus(): Promise<void> {
		const anchor = this.linkCtrls[0]?.getAnchorRef();
		if (anchor) return delegateFocus(this.host!, () => setFocus(anchor));
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

	/**
	 * Defines the list of links combined with their labels to render.
	 */
	@Prop() public _links!: Stringified<LinkProps[]>;

	@State() public state: SkipNavStates = {
		_label: '', // ⚠ required
		_links: [],
	};

	@Watch('_label')
	public validateLabel(value?: LabelPropType, _oldValue?: LabelPropType, initial = false): void {
		if (!initial) {
			removeNavLabel(this.state._label); // remove the current
		}
		validateLabel(this, value, {
			required: true,
		});
		addNavLabel(this.state._label); // add the state instead of prop, because the prop could be invalid and not set as new label
	}

	@Watch('_links')
	public validateLinks(value?: Stringified<LinkProps[]>): void {
		watchNavLinks('KolSkipNav', this, value);
		this.syncLinkControllers();
	}

	private syncLinkControllers(): void {
		this.linkCtrls.forEach((c) => c.destroy());
		this.linkCtrls = this.state._links.map((link) => {
			const ctrl = new LinkController(createLinkStateAccess(this.forceRender));
			initLinkControllerFromProps(ctrl, link as { _href: string } & Partial<Record<string, unknown>>);
			return ctrl;
		});
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label, undefined, true);
		this.validateLinks(this._links);
	}

	public disconnectedCallback(): void {
		removeNavLabel(this.state._label);
		this.linkCtrls.forEach((c) => c.destroy());
		this.linkCtrls = [];
	}
}
