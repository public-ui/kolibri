import { Generic } from '@a11y-ui/core';
import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';
import { translate } from '../../i18n';
import { KoliBriButtonCallbacks } from '../../types/button-link';
import { ButtonOrLinkOrTextWithChildrenProps, ButtonWithChildrenProps, LinkWithChildrenProps } from '../../types/button-link-text';
import { Stringified } from '../../types/common';
import { KoliBriIconProp } from '../../types/icon';
import { Orientation } from '../../types/orientation';
import {
	AriaCurrent,
	PropCollapsible,
	PropCompact,
	PropHasCompactButton,
	validateCollapsible,
	validateCompact,
	validateHasCompactButton,
} from '../../types/props';
import { a11yHintLabelingLandmarks, devHint, devWarning } from '../../utils/a11y.tipps';
import { watchString, watchValidator } from '../../utils/prop.validators';
import { watchNavLinks } from './validation';

/**
 * @deprecated
 */
export type KoliBriNavVariant = 'primary' | 'secondary';

const UNIQUE_ARIA_LABEL: string[] = [];
const removeAriaLabel = (ariaLabel: string) => {
	const index = UNIQUE_ARIA_LABEL.indexOf(ariaLabel);
	if (index >= 0) {
		UNIQUE_ARIA_LABEL.splice(index, 1);
	}
};

const linkValidator = (link: ButtonOrLinkOrTextWithChildrenProps): boolean => {
	if (typeof link === 'object' && typeof link._label === 'string' /* && typeof newLink._href === 'string' */) {
		if (Array.isArray(link._children)) {
			return linksValidator(link._children);
		}
		return false;
	}
	return true;
};

const linksValidator = (links: ButtonOrLinkOrTextWithChildrenProps[]): boolean => {
	if (Array.isArray(links)) {
		return links.find(linkValidator) !== undefined;
	}
	return true;
};

type RequiredProps = {
	ariaLabel: string;
	links: Stringified<ButtonOrLinkOrTextWithChildrenProps[]>;
};
type OptionalProps = {
	ariaCurrentValue: AriaCurrent;
	orientation: Orientation;
	/**
	 * @deprecated
	 */
	variant: KoliBriNavVariant;
} & PropCollapsible &
	PropCompact &
	PropHasCompactButton;
// type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	ariaCurrentValue: AriaCurrent;
	ariaLabel: string;
	collapsible: boolean;
	hasCompactButton: boolean;
	links: ButtonOrLinkOrTextWithChildrenProps[];
	orientation: Orientation;
	/**
	 * @deprecated
	 */
	variant: KoliBriNavVariant;
} & PropCollapsible &
	PropHasCompactButton;
type OptionalStates = PropCompact;
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

@Component({
	tag: 'kol-nav',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolNav implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	private readonly onClick = (link: ButtonOrLinkOrTextWithChildrenProps): void => {
		link._active = !link._active;
		this.state = {
			...this.state,
		};
	};

	private readonly hasActiveChild = (link: ButtonOrLinkOrTextWithChildrenProps): boolean => {
		if (Array.isArray(link._children) && link._children.length > 0) {
			return link._children.some(this.hasActiveChild);
		}

		return false;
	};

	/** Element creation functions */
	private button(
		selected: boolean,
		compact: boolean,
		disabled: boolean,
		icon: Stringified<KoliBriIconProp> | undefined,
		label: string,
		on: KoliBriButtonCallbacks<unknown>
	): JSX.Element {
		return (
			<kol-button-wc
				// _ariaCurrent will not be set here, since it will be set on a child of this item.
				_ariaExpanded={selected}
				_disabled={disabled}
				_icon={icon}
				_iconOnly={compact}
				_label={label}
				_on={on}
			></kol-button-wc>
		);
	}

	private text(compact: boolean, icon: Stringified<KoliBriIconProp> | undefined, label: string): JSX.Element {
		return <kol-span-wc _icon={icon} _iconOnly={compact} _label={label}></kol-span-wc>;
	}

	private dropDown(collapsible: boolean, compact: boolean, deep: number, link: ButtonOrLinkOrTextWithChildrenProps, orientation: Orientation): JSX.Element {
		return (
			<div
				class={{
					'list-container': true,
					'active-child': this.hasActiveChild(link),
					'absolute ': deep === 0 && orientation === 'horizontal',
				}}
			>
				{/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
				<this.linkList collapsible={collapsible} compact={compact} deep={deep + 1} links={link._children!} orientation={orientation} />
			</div>
		);
	}

	private entry(
		collapsible: boolean,
		compact: boolean,
		hasChildren: boolean,
		link: ButtonOrLinkOrTextWithChildrenProps,
		expanded: boolean,
		selected: boolean,
		textCenter: boolean
	): JSX.Element {
		return (
			<div
				class={{
					entry: true,
					'has-children': hasChildren,
					selected,
					expanded,
					'text-center': textCenter,
				}}
			>
				{this.buttonOrLinkOrText(compact, link, selected)}
				{hasChildren ? this.expandButton(collapsible, link, selected) : ''}
			</div>
		);
	}

	private expandButton(collapsible: boolean, link: ButtonOrLinkOrTextWithChildrenProps, selected: boolean): JSX.Element {
		return (
			<kol-button-wc
				class="expand-button"
				_disabled={!collapsible}
				_icon={'codicon codicon-' + (selected ? 'remove' : 'add')}
				_iconOnly
				_label={`Untermenü zu ${link._label} ${selected ? 'schließen' : 'öffnen'}`}
				_on={{ onClick: () => this.onClick(link) }}
			></kol-button-wc>
		);
	}

	private li(
		collapsible: boolean,
		compact: boolean,
		deep: number,
		index: number,
		link: ButtonOrLinkOrTextWithChildrenProps,
		orientation: Orientation
	): JSX.Element {
		const hasChildren = Array.isArray(link._children) && link._children.length > 0;
		const selected = !!link._active;
		const expanded = hasChildren && !!link._active;
		const textCenter = compact;
		return (
			<li class={{ expanded, selected, 'has-children': hasChildren }} key={index}>
				{this.entry(collapsible, compact, hasChildren, link, expanded, selected, textCenter)}
				{hasChildren && selected ? this.dropDown(collapsible, compact, deep, link, orientation) : ''}
			</li>
		);
	}

	private link(selected: boolean, compact: boolean, href: string, icon: Stringified<KoliBriIconProp> | undefined, label: string): JSX.Element {
		return (
			<kol-link-wc
				// _ariaCurrent will not be set here, since it will be set on a child of this item.
				_ariaExpanded={selected}
				_href={href}
				_icon={icon}
				_iconOnly={compact}
				_label={label}
			></kol-link-wc>
		);
	}

	private linkList = (props: {
		collapsible: boolean;
		compact: boolean;
		deep: number;
		links: ButtonOrLinkOrTextWithChildrenProps[];
		orientation: Orientation;
	}): JSX.Element => {
		return (
			<ul class={`list ${props.deep === 0 && props.orientation === 'horizontal' ? ' horizontal' : ' vertical'}`} data-deep={props.deep}>
				{props.links.map((link, index: number) => {
					return this.li(props.collapsible, props.compact, props.deep, index, link, props.orientation);
				})}
			</ul>
		);
	};

	private buttonOrLinkOrText(compact: boolean, link: ButtonOrLinkOrTextWithChildrenProps, selected: boolean): JSX.Element {
		if ((link as ButtonWithChildrenProps)._on) {
			return this.button(
				selected,
				compact,
				(link as ButtonWithChildrenProps)._disabled === true,
				link._icon,
				link._label,
				(link as ButtonWithChildrenProps)._on
			);
		} else if ((link as LinkWithChildrenProps)._href) {
			return this.link(selected, compact, (link as LinkWithChildrenProps)._href, link._icon, link._label);
		} else {
			return this.text(compact, link._icon, link._label);
		}
	}

	public render(): JSX.Element {
		let hasCompactButton = this.state._hasCompactButton;
		if (this.state._orientation === 'horizontal' && this.state._hasCompactButton === true) {
			hasCompactButton = false;
			devWarning(`[KolNav] Wenn eine horizontale Navigation verwendet wird, kann die Option _hasCompactButton nicht aktiviert werden.`);
		}
		const collapsible = this.state._collapsible === true;
		const compact = this.state._compact === true;
		const orientation = this.state._orientation;
		return (
			<Host>
				<div
					class={{
						[orientation]: true,
						'inline-block': compact,
						[this.state._variant]: true,
					}}
				>
					<nav aria-label={this.state._ariaLabel} id="nav">
						<this.linkList collapsible={collapsible} compact={compact} deep={0} links={this.state._links} orientation={orientation}></this.linkList>
					</nav>
					{hasCompactButton && (
						<div class="mt-2 w-full text-center">
							<kol-button
								_ariaControls="nav"
								_ariaExpanded={compact}
								_ariaLabel={translate(compact ? 'kol-nav-maximize' : 'kol-nav-minimize')}
								_icon={compact ? 'codicon codicon-chevron-right' : 'codicon codicon-chevron-left'}
								_iconOnly
								_label={translate(compact ? 'kol-nav-maximize' : 'kol-nav-minimize')}
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
	@Prop() public _links!: Stringified<ButtonOrLinkOrTextWithChildrenProps[]>;

	/**
	 * Gibt an, welche Ausprägung der Button hat.
	 *
	 * @deprecated This property is deprecated and will be removed in the next major version.
	 */
	@Prop() public _variant?: KoliBriNavVariant = 'primary';

	@State() public state: States = {
		_ariaCurrentValue: false,
		_ariaLabel: '…', // '⚠'
		_collapsible: true,
		_hasCompactButton: false,
		_links: [],
		_orientation: 'vertical',
		_variant: 'primary',
	};

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

	@Watch('_collapsible')
	public validateCollapsible(value?: boolean): void {
		validateCollapsible(this, value);
	}

	@Watch('_compact')
	public validateCompact(value?: boolean): void {
		validateCompact(this, value);
	}

	@Watch('_hasCompactButton')
	public validateHasCompactButton(value?: boolean): void {
		validateHasCompactButton(this, value);
	}

	@Watch('_links')
	public validateLinks(value?: Stringified<ButtonOrLinkOrTextWithChildrenProps[]>): void {
		watchNavLinks('KolNav', this, value);
		devHint(`[KolNav] Die Navigationsstruktur wird noch nicht rekursiv validiert.`);
	}

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

	@Watch('_variant')
	public validateVariant(value?: KoliBriNavVariant): void {
		watchValidator(this, '_variant', (value) => value === 'primary' || value === 'secondary', new Set(['KoliBriNavVariant {primary, secondary}']), value, {
			defaultValue: 'primary',
		});
	}

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
