import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';
import { Generic } from '@a11y-ui/core';
import { Orientation } from '../../types/orientation';
import { a11yHintLabelingLandmarks, devHint } from '../../utils/a11y.tipps';
import { watchBoolean, watchString, watchValidator } from '../../utils/prop.validators';
import { NavLinkProps } from '../link/component';
import { watchNavLinks } from './validation';
import { Stringified } from '../../types/common';
import { AriaCurrent } from '../../types/button-link';
import { translate } from '../../i18n';

export type NavLinkWithChildrenProps = NavLinkProps & {
	_children?: NavLinkWithChildrenProps[];
};

export type KoliBriNavVariant = 'primary' | 'secondary';

const UNIQUE_ARIA_LABEL: string[] = [];
const removeAriaLabel = (ariaLabel: string) => {
	const index = UNIQUE_ARIA_LABEL.indexOf(ariaLabel);
	if (index >= 0) {
		UNIQUE_ARIA_LABEL.splice(index, 1);
	}
};

const linkValidator = (link: NavLinkWithChildrenProps): boolean => {
	if (typeof link === 'object' && typeof link._label === 'string' /* && typeof newLink._href === 'string' */) {
		if (Array.isArray(link._children)) {
			return linksValidator(link._children);
		}
		return false;
	}
	return true;
};

const linksValidator = (links: NavLinkWithChildrenProps[]): boolean => {
	if (Array.isArray(links)) {
		return links.find(linkValidator) !== undefined;
	}
	return true;
};

/**
 * API
 */
type RequiredProps = {
	ariaLabel: string;
	links: Stringified<NavLinkWithChildrenProps[]>;
};
type OptionalProps = {
	ariaCurrentValue: AriaCurrent;
	collapsible: boolean;
	compact: boolean;
	hasCompactButton: boolean;
	orientation: Orientation;
	variant: KoliBriNavVariant;
};
// type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	ariaCurrentValue: AriaCurrent;
	ariaLabel: string;
	collapsible: boolean;
	hasCompactButton: boolean;
	links: NavLinkWithChildrenProps[];
	orientation: Orientation;
	variant: KoliBriNavVariant;
};
type OptionalStates = {
	compact: boolean;
};
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

/**
 * @part nav - TBD
 */
@Component({
	tag: 'kol-nav',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolNav implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	private readonly onClick = (link: NavLinkWithChildrenProps): void => {
		link._active = !link._active;
		this.state = {
			...this.state,
		};
	};

	private readonly hasActiveChild = (link: NavLinkWithChildrenProps): boolean => {
		if (Array.isArray(link._children) && link._children.length > 0) {
			return link._children.some(this.hasActiveChild);
		}

		return false;
	};

	private linkList = (props: { links: NavLinkWithChildrenProps[]; deep: number }): JSX.Element => {
		return (
			<ul
				class={`list ${props.deep === 0 && this.state._orientation === 'horizontal' ? ' horizontal' : ' vertical'}`}
				data-deep={props.deep}
				part={`nav ${this.state._orientation}`}
			>
				{props.links.map((link, index: number) => {
					const hasChildren = Array.isArray(link._children) && link._children.length > 0;
					return (
						<li
							class={{ selected: !!link._active, 'has-children': hasChildren }}
							key={index}
							part={`li ${props.deep === 0 ? this.state._orientation : 'vertical'}${link._active ? ' selected' : ''}${
								index < props.links.length - 1 ? '' : ' last'
							}`}
						>
							{hasChildren ? (
								<div style={{ position: 'relative' }}>
									<div class={{ 'entry has-children': true, 'expanded selected': !!link._active, 'has-link': !!link._href }}>
										<kol-link-wc
											exportparts={`icon,link,span${link._active === true ? ',selected' : ''}`}
											// _ariaCurrent will not be set here, since it will be set on a child of this item.
											_ariaLabel={this.state._compact === true || link._iconOnly === true ? link._label : undefined}
											_ariaExpanded={link._active === true}
											_disabled={link._disabled}
											_href={link._href}
											_icon={link._icon}
											_iconOnly={this.state._compact === true || link._iconOnly === true}
											_label={link._label}
											onClick={link._href ? undefined : () => this.onClick(link)}
										></kol-link-wc>
										<kol-button-wc
											_customClass="expand-button"
											_disabled={!this.state._collapsible || !link._href}
											_icon={'codicon codicon-' + (link._active ? 'remove' : 'add')}
											_label=""
											_variant="custom"
											class="expand-button-container"
											onClick={() => this.onClick(link)}
										></kol-button-wc>
									</div>
									{link._active ? (
										<div
											class={{
												'list-container': true,
												'active-child': this.hasActiveChild(link),
												'absolute ': props.deep === 0 && this.state._orientation === 'horizontal',
											}}
										>
											<this.linkList links={link._children!} deep={props.deep + 1} />
										</div>
									) : (
										''
									)}
								</div>
							) : (
								<div class={{ entry: true, selected: !!link._active, 'text-center': this.state._compact === true || link._iconOnly === true }}>
									<kol-link-wc
										class={{ active: link._active === true }}
										exportparts={`icon,link,span${link._active === true ? ',selected' : ''}`}
										_ariaCurrent={link._active ? this.state._ariaCurrentValue : false}
										_ariaLabel={this.state._compact || link._iconOnly ? link._label : undefined}
										_href={link._href}
										_icon={typeof link._icon === 'string' ? link._icon : 'codicon codicon-symbol-event'}
										_icon-only={this.state._compact || link._iconOnly}
										_label={link._label}
										_on={link._on}
										_selector={link._selector}
										_tooltipAlign={link._tooltipAlign}
										_target={link._target}
									/>
								</div>
							)}
						</li>
					);
				})}
			</ul>
		);
	};

	public render(): JSX.Element {
		let hasCompactButton = this.state._hasCompactButton;
		if (this.state._orientation === 'horizontal' && this.state._hasCompactButton === true) {
			hasCompactButton = false;
			devHint(`[KolNav] Wenn eine horizontale Navigation verwendet wird, kann die Option _hasCompactButton nicht aktiviert werden.`);
		}

		return (
			<Host>
				<div
					class={{
						[this.state._orientation]: true,
						'inline-block': this.state._compact === true,
						[this.state._variant]: true,
					}}
				>
					<nav aria-label={this.state._ariaLabel} id="nav" part="nav">
						<this.linkList links={this.state._links} deep={0}></this.linkList>
					</nav>
					{hasCompactButton && (
						<div class="mt-2 w-full text-center">
							<kol-button
								exportparts="button,ghost"
								_ariaControls="nav"
								_ariaExpanded={this.state._compact === true}
								_ariaLabel={translate(this.state._compact ? 'kol-nav-maximize' : 'kol-nav-minimize')}
								_icon={this.state._compact ? 'codicon codicon-chevron-right' : 'codicon codicon-chevron-left'}
								_iconOnly
								_label={translate(this.state._compact ? 'kol-nav-maximize' : 'kol-nav-minimize')}
								_on={{
									onClick: (): void => {
										this.state = {
											...this.state,
											_compact: this.state._compact === false,
										};
									},
								}}
								_tooltipAlign="right"
								_variant="ghost"
							></kol-button>
						</div>
					)}
				</div>
			</Host>
		);
	}

	/**
	 * Gibt den Wert von aria-current an, der bei dem aktuellen Kontext innerhalb der Navigation verwendet werden soll.
	 */
	@Prop() public _ariaCurrentValue: AriaCurrent = false;

	/**
	 * Gibt den Text an, der die Navigation von anderen Navigationen differenziert.
	 */
	@Prop() public _ariaLabel!: string;

	/**
	 * Gibt an, ob Knoten in der Navigation zusammengeklappt werden können. Ist standardmäßig aktiv.
	 */
	@Prop({ reflect: true }) public _collapsible?: boolean = true;

	/**
	 * Gibt an, ob die Navigation kompakt angezeigt wird.
	 */
	@Prop({ reflect: true }) public _compact?: boolean = false;

	/**
	 * Gibt an, ob die Navigation eine zusätzliche Schaltfläche zum Aus- und Einklappen der Navigation anzeigen soll.
	 */
	@Prop({ reflect: true }) public _hasCompactButton?: boolean = false;

	/**
	 * Gibt die Ausrichtung der Navigation an.
	 */
	@Prop() public _orientation?: Orientation = 'vertical';

	/**
	 * Gibt die geordnete Liste der Seitenhierarchie an.
	 */
	@Prop() public _links!: Stringified<NavLinkWithChildrenProps[]>;

	/**
	 * Gibt an, welche Ausprägung der Button hat.
	 */
	@Prop() public _variant?: KoliBriNavVariant = 'primary';

	/**
	 * @see: components/abbr/component.tsx (@State)
	 */
	@State() public state: States = {
		_ariaCurrentValue: false,
		_ariaLabel: '…', // '⚠'
		_collapsible: true,
		_hasCompactButton: false,
		_links: [],
		_orientation: 'vertical',
		_variant: 'primary',
	};

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_ariaCurrentValue')
	public validateAriaCurrentValue(value?: AriaCurrent): void {
		watchValidator(
			this,
			'_ariaCurrentValue',
			(value) => value === true || value === 'date' || value === 'location' || value === 'page' || value === 'step' || value === 'time',
			new Set(['boolean', 'String {data, location, page, step, time}']),
			value
		);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_ariaLabel')
	public validateAriaLabel(value?: string): void {
		watchString(this, '_ariaLabel', value, {
			hooks: {
				afterPatch: () => {
					if (UNIQUE_ARIA_LABEL.includes(this.state._ariaLabel)) {
						devHint(`[KolNav] Das Aria-Label "${this.state._ariaLabel}" wurde für die Rolle Navigation mehrfach verwendet!`);
					}
					UNIQUE_ARIA_LABEL.push(this.state._ariaLabel);
				},
				beforePatch: () => {
					removeAriaLabel(this.state._ariaLabel);
				},
			},
			required: true,
		});
		a11yHintLabelingLandmarks(value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_collapsible')
	public validateCollapsible(value?: boolean): void {
		watchBoolean(this, '_collapsible', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_compact')
	public validateCompact(value?: boolean): void {
		watchBoolean(this, '_compact', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_hasCompactButton')
	public validateHasCompactButton(value?: boolean): void {
		watchBoolean(this, '_hasCompactButton', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_links')
	public validateLinks(value?: Stringified<NavLinkWithChildrenProps[]>): void {
		watchNavLinks('KolNav', this, value);
		devHint(`[KolNav] Die Navigationsstruktur wird noch nicht rekursiv validiert.`);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_orientation')
	public validateOrientation(value?: Orientation): void {
		watchValidator(
			this,
			'_orientation',
			(value): boolean => value === 'horizontal' || value === 'vertical',
			new Set(['Orientation {horizontal, vertical}']),
			value,
			{
				defaultValue: 'vertical',
			}
		);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_variant')
	public validateVariant(value?: KoliBriNavVariant): void {
		watchValidator(this, '_variant', (value) => value === 'primary' || value === 'secondary', new Set(['KoliBriNavVariant {primary, secondary}']), value, {
			defaultValue: 'primary',
		});
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		this.validateAriaCurrentValue(this._ariaCurrentValue);
		this.validateAriaLabel(this._ariaLabel);
		this.validateCollapsible(this._collapsible);
		this.validateCompact(this._compact);
		this.validateHasCompactButton(this._hasCompactButton);
		this.validateLinks(this._links);
		this.validateOrientation(this._orientation);
		this.validateVariant(this._variant);
	}

	public disconnectedCallback(): void {
		removeAriaLabel(this.state._ariaLabel);
	}
}
