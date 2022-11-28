/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';
import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from '@public-ui/components';




export declare interface KolAbbr extends Components.KolAbbr {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_title', '_tooltipAlign']
})
@Component({
  selector: 'kol-abbr',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_title', '_tooltipAlign']
})
export class KolAbbr {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolAccordion extends Components.KolAccordion {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_heading', '_level', '_on', '_open']
})
@Component({
  selector: 'kol-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_heading', '_level', '_on', '_open']
})
export class KolAccordion {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolAlert extends Components.KolAlert {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_alert', '_hasCloser', '_heading', '_level', '_on', '_type', '_variant']
})
@Component({
  selector: 'kol-alert',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_alert', '_hasCloser', '_heading', '_level', '_on', '_type', '_variant']
})
export class KolAlert {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolBadge extends Components.KolBadge {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_color', '_icon', '_iconAlign', '_iconOnly', '_label']
})
@Component({
  selector: 'kol-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_color', '_icon', '_iconAlign', '_iconOnly', '_label']
})
export class KolBadge {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolBreadcrumb extends Components.KolBreadcrumb {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_ariaLabel', '_links']
})
@Component({
  selector: 'kol-breadcrumb',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_ariaLabel', '_links']
})
export class KolBreadcrumb {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolButton extends Components.KolButton {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_accessKey', '_ariaControls', '_ariaCurrent', '_ariaExpanded', '_ariaLabel', '_customClass', '_disabled', '_icon', '_iconAlign', '_iconOnly', '_id', '_label', '_on', '_tabIndex', '_tooltipAlign', '_type', '_variant'],
  methods: ['getInteractiveElementRef']
})
@Component({
  selector: 'kol-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_accessKey', '_ariaControls', '_ariaCurrent', '_ariaExpanded', '_ariaLabel', '_customClass', '_disabled', '_icon', '_iconAlign', '_iconOnly', '_id', '_label', '_on', '_tabIndex', '_tooltipAlign', '_type', '_variant']
})
export class KolButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolButtonGroup extends Components.KolButtonGroup {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'kol-button-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class KolButtonGroup {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolButtonLink extends Components.KolButtonLink {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_accessKey', '_ariaControls', '_ariaCurrent', '_ariaExpanded', '_ariaLabel', '_disabled', '_icon', '_iconAlign', '_iconOnly', '_id', '_label', '_on', '_tabIndex', '_tooltipAlign', '_type']
})
@Component({
  selector: 'kol-button-link',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_accessKey', '_ariaControls', '_ariaCurrent', '_ariaExpanded', '_ariaLabel', '_disabled', '_icon', '_iconAlign', '_iconOnly', '_id', '_label', '_on', '_tabIndex', '_tooltipAlign', '_type']
})
export class KolButtonLink {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolCard extends Components.KolCard {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_hasFooter', '_heading', '_headline', '_level']
})
@Component({
  selector: 'kol-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_hasFooter', '_heading', '_headline', '_level']
})
export class KolCard {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolDetails extends Components.KolDetails {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_open', '_summary']
})
@Component({
  selector: 'kol-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_open', '_summary']
})
export class KolDetails {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolForm extends Components.KolForm {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_on', '_requiredText']
})
@Component({
  selector: 'kol-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_on', '_requiredText']
})
export class KolForm {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolHeading extends Components.KolHeading {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_level']
})
@Component({
  selector: 'kol-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_level']
})
export class KolHeading {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolIcon extends Components.KolIcon {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_ariaLabel', '_icon', '_part']
})
@Component({
  selector: 'kol-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_ariaLabel', '_icon', '_part']
})
export class KolIcon {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolIconFontAwesome extends Components.KolIconFontAwesome {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_ariaLabel', '_icon', '_part', '_prefix']
})
@Component({
  selector: 'kol-icon-font-awesome',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_ariaLabel', '_icon', '_part', '_prefix']
})
export class KolIconFontAwesome {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolIconIcofont extends Components.KolIconIcofont {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_ariaLabel', '_icon', '_part']
})
@Component({
  selector: 'kol-icon-icofont',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_ariaLabel', '_icon', '_part']
})
export class KolIconIcofont {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolIndentedText extends Components.KolIndentedText {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'kol-indented-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class KolIndentedText {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolInputAdapterLeanup extends Components.KolInputAdapterLeanup {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'kol-input-adapter-leanup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class KolInputAdapterLeanup {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolInputCheckbox extends Components.KolInputCheckbox {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_accessKey', '_alert', '_checked', '_disabled', '_error', '_hideLabel', '_hint', '_id', '_indeterminate', '_name', '_on', '_required', '_tabIndex', '_touched', '_type', '_value', '_variant']
})
@Component({
  selector: 'kol-input-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_accessKey', '_alert', '_checked', '_disabled', '_error', '_hideLabel', '_hint', '_id', '_indeterminate', '_name', '_on', '_required', '_tabIndex', '_touched', '_type', '_value', '_variant']
})
export class KolInputCheckbox {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolInputColor extends Components.KolInputColor {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_accessKey', '_alert', '_autoComplete', '_disabled', '_error', '_hideLabel', '_hint', '_icon', '_id', '_list', '_name', '_on', '_smartButton', '_tabIndex', '_touched', '_value']
})
@Component({
  selector: 'kol-input-color',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_accessKey', '_alert', '_autoComplete', '_disabled', '_error', '_hideLabel', '_hint', '_icon', '_id', '_list', '_name', '_on', '_smartButton', '_tabIndex', '_touched', '_value']
})
export class KolInputColor {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolInputDate extends Components.KolInputDate {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_accessKey', '_alert', '_autoComplete', '_disabled', '_error', '_hideLabel', '_hint', '_icon', '_id', '_list', '_max', '_min', '_name', '_on', '_readOnly', '_required', '_smartButton', '_step', '_tabIndex', '_touched', '_type', '_value']
})
@Component({
  selector: 'kol-input-date',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_accessKey', '_alert', '_autoComplete', '_disabled', '_error', '_hideLabel', '_hint', '_icon', '_id', '_list', '_max', '_min', '_name', '_on', '_readOnly', '_required', '_smartButton', '_step', '_tabIndex', '_touched', '_type', '_value']
})
export class KolInputDate {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolInputEmail extends Components.KolInputEmail {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_accessKey', '_alert', '_autoComplete', '_disabled', '_error', '_hideLabel', '_hint', '_icon', '_id', '_list', '_maxLength', '_multiple', '_name', '_on', '_pattern', '_placeholder', '_readOnly', '_required', '_size', '_smartButton', '_tabIndex', '_touched', '_value']
})
@Component({
  selector: 'kol-input-email',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_accessKey', '_alert', '_autoComplete', '_disabled', '_error', '_hideLabel', '_hint', '_icon', '_id', '_list', '_maxLength', '_multiple', '_name', '_on', '_pattern', '_placeholder', '_readOnly', '_required', '_size', '_smartButton', '_tabIndex', '_touched', '_value']
})
export class KolInputEmail {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolInputFile extends Components.KolInputFile {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_accept', '_accessKey', '_alert', '_disabled', '_error', '_hideLabel', '_hint', '_icon', '_id', '_multiple', '_name', '_on', '_required', '_smartButton', '_tabIndex', '_touched', '_value']
})
@Component({
  selector: 'kol-input-file',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_accept', '_accessKey', '_alert', '_disabled', '_error', '_hideLabel', '_hint', '_icon', '_id', '_multiple', '_name', '_on', '_required', '_smartButton', '_tabIndex', '_touched', '_value']
})
export class KolInputFile {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolInputNumber extends Components.KolInputNumber {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_accessKey', '_alert', '_autoComplete', '_disabled', '_error', '_hideLabel', '_hint', '_icon', '_id', '_list', '_max', '_min', '_name', '_on', '_placeholder', '_readOnly', '_required', '_smartButton', '_step', '_tabIndex', '_touched', '_type', '_value']
})
@Component({
  selector: 'kol-input-number',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_accessKey', '_alert', '_autoComplete', '_disabled', '_error', '_hideLabel', '_hint', '_icon', '_id', '_list', '_max', '_min', '_name', '_on', '_placeholder', '_readOnly', '_required', '_smartButton', '_step', '_tabIndex', '_touched', '_type', '_value']
})
export class KolInputNumber {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolInputPassword extends Components.KolInputPassword {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_accessKey', '_alert', '_autoComplete', '_disabled', '_error', '_hideLabel', '_hint', '_icon', '_id', '_maxLength', '_name', '_on', '_pattern', '_placeholder', '_readOnly', '_required', '_size', '_smartButton', '_tabIndex', '_touched', '_value']
})
@Component({
  selector: 'kol-input-password',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_accessKey', '_alert', '_autoComplete', '_disabled', '_error', '_hideLabel', '_hint', '_icon', '_id', '_maxLength', '_name', '_on', '_pattern', '_placeholder', '_readOnly', '_required', '_size', '_smartButton', '_tabIndex', '_touched', '_value']
})
export class KolInputPassword {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolInputRadio extends Components.KolInputRadio {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_accessKey', '_alert', '_disabled', '_error', '_hideLabel', '_hint', '_id', '_list', '_name', '_on', '_orientation', '_required', '_tabIndex', '_touched', '_value']
})
@Component({
  selector: 'kol-input-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_accessKey', '_alert', '_disabled', '_error', '_hideLabel', '_hint', '_id', '_list', '_name', '_on', '_orientation', '_required', '_tabIndex', '_touched', '_value']
})
export class KolInputRadio {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolInputRange extends Components.KolInputRange {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_accessKey', '_alert', '_autoComplete', '_disabled', '_error', '_hideLabel', '_hint', '_icon', '_id', '_list', '_max', '_min', '_name', '_on', '_step', '_tabIndex', '_touched', '_value']
})
@Component({
  selector: 'kol-input-range',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_accessKey', '_alert', '_autoComplete', '_disabled', '_error', '_hideLabel', '_hint', '_icon', '_id', '_list', '_max', '_min', '_name', '_on', '_step', '_tabIndex', '_touched', '_value']
})
export class KolInputRange {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolInputText extends Components.KolInputText {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_accessKey', '_alert', '_autoComplete', '_disabled', '_error', '_hideLabel', '_hint', '_icon', '_id', '_list', '_maxLength', '_name', '_on', '_pattern', '_placeholder', '_readOnly', '_required', '_size', '_smartButton', '_tabIndex', '_touched', '_type', '_value']
})
@Component({
  selector: 'kol-input-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_accessKey', '_alert', '_autoComplete', '_disabled', '_error', '_hideLabel', '_hint', '_icon', '_id', '_list', '_maxLength', '_name', '_on', '_pattern', '_placeholder', '_readOnly', '_required', '_size', '_smartButton', '_tabIndex', '_touched', '_type', '_value']
})
export class KolInputText {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolKolibri extends Components.KolKolibri {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_animate', '_color', '_labeled']
})
@Component({
  selector: 'kol-kolibri',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_animate', '_color', '_labeled']
})
export class KolKolibri {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolLink extends Components.KolLink {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_ariaControls', '_ariaCurrent', '_ariaExpanded', '_ariaLabel', '_ariaSelected', '_disabled', '_fill', '_href', '_icon', '_iconAlign', '_iconOnly', '_on', '_part', '_selector', '_stealth', '_tabIndex', '_target', '_targetDescription', '_tooltipAlign', '_underline', '_useCase']
})
@Component({
  selector: 'kol-link',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_ariaControls', '_ariaCurrent', '_ariaExpanded', '_ariaLabel', '_ariaSelected', '_disabled', '_fill', '_href', '_icon', '_iconAlign', '_iconOnly', '_on', '_part', '_selector', '_stealth', '_tabIndex', '_target', '_targetDescription', '_tooltipAlign', '_underline', '_useCase']
})
export class KolLink {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolLinkButton extends Components.KolLinkButton {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_ariaControls', '_ariaCurrent', '_ariaExpanded', '_ariaLabel', '_ariaSelected', '_customClass', '_disabled', '_fill', '_href', '_icon', '_iconAlign', '_iconOnly', '_label', '_on', '_part', '_selector', '_stealth', '_tabIndex', '_target', '_targetDescription', '_tooltipAlign', '_underline', '_useCase', '_variant']
})
@Component({
  selector: 'kol-link-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_ariaControls', '_ariaCurrent', '_ariaExpanded', '_ariaLabel', '_ariaSelected', '_customClass', '_disabled', '_fill', '_href', '_icon', '_iconAlign', '_iconOnly', '_label', '_on', '_part', '_selector', '_stealth', '_tabIndex', '_target', '_targetDescription', '_tooltipAlign', '_underline', '_useCase', '_variant']
})
export class KolLinkButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolLinkGroup extends Components.KolLinkGroup {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_ariaLabel', '_heading', '_level', '_links', '_listStyleType', '_ordered', '_orientation']
})
@Component({
  selector: 'kol-link-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_ariaLabel', '_heading', '_level', '_links', '_listStyleType', '_ordered', '_orientation']
})
export class KolLinkGroup {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolLogo extends Components.KolLogo {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_abbr', '_org']
})
@Component({
  selector: 'kol-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_abbr', '_org']
})
export class KolLogo {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolModal extends Components.KolModal {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_activeElement', '_ariaLabel', '_on', '_show', '_width']
})
@Component({
  selector: 'kol-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_activeElement', '_ariaLabel', '_on', '_show', '_width']
})
export class KolModal {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolNav extends Components.KolNav {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_ariaCurrentValue', '_ariaLabel', '_collapsible', '_compact', '_hasCompactButton', '_links', '_orientation', '_variant']
})
@Component({
  selector: 'kol-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_ariaCurrentValue', '_ariaLabel', '_collapsible', '_compact', '_hasCompactButton', '_links', '_orientation', '_variant']
})
export class KolNav {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolPagination extends Components.KolPagination {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_boundaryCount', '_customClass', '_hasButtons', '_on', '_page', '_pageSize', '_pageSizeOptions', '_siblingCount', '_tooltipAlign', '_total', '_variant']
})
@Component({
  selector: 'kol-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_boundaryCount', '_customClass', '_hasButtons', '_on', '_page', '_pageSize', '_pageSizeOptions', '_siblingCount', '_tooltipAlign', '_total', '_variant']
})
export class KolPagination {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolProgress extends Components.KolProgress {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_max', '_type', '_unit', '_value']
})
@Component({
  selector: 'kol-progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_max', '_type', '_unit', '_value']
})
export class KolProgress {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolSelect extends Components.KolSelect {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_accessKey', '_alert', '_disabled', '_error', '_height', '_hideLabel', '_hint', '_icon', '_id', '_list', '_multiple', '_name', '_on', '_required', '_size', '_tabIndex', '_touched', '_value']
})
@Component({
  selector: 'kol-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_accessKey', '_alert', '_disabled', '_error', '_height', '_hideLabel', '_hint', '_icon', '_id', '_list', '_multiple', '_name', '_on', '_required', '_size', '_tabIndex', '_touched', '_value']
})
export class KolSelect {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolSkipNav extends Components.KolSkipNav {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_ariaLabel', '_links']
})
@Component({
  selector: 'kol-skip-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_ariaLabel', '_links']
})
export class KolSkipNav {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolSpan extends Components.KolSpan {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_icon', '_iconOnly', '_label']
})
@Component({
  selector: 'kol-span',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_icon', '_iconOnly', '_label']
})
export class KolSpan {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolSpin extends Components.KolSpin {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_show']
})
@Component({
  selector: 'kol-spin',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_show']
})
export class KolSpin {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolSymbol extends Components.KolSymbol {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_ariaLabel', '_symbol']
})
@Component({
  selector: 'kol-symbol',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_ariaLabel', '_symbol']
})
export class KolSymbol {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolTable extends Components.KolTable {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_caption', '_data', '_headers', '_minWidth', '_pagination']
})
@Component({
  selector: 'kol-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_caption', '_data', '_headers', '_minWidth', '_pagination']
})
export class KolTable {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolTabs extends Components.KolTabs {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_ariaLabel', '_on', '_selected', '_tabs', '_tabsAlign']
})
@Component({
  selector: 'kol-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_ariaLabel', '_on', '_selected', '_tabs', '_tabsAlign']
})
export class KolTabs {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolTextarea extends Components.KolTextarea {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_accessKey', '_adjustHeight', '_alert', '_disabled', '_error', '_hasCounter', '_hideLabel', '_hint', '_id', '_maxLength', '_name', '_on', '_placeholder', '_readOnly', '_required', '_resize', '_rows', '_tabIndex', '_touched', '_value']
})
@Component({
  selector: 'kol-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_accessKey', '_adjustHeight', '_alert', '_disabled', '_error', '_hasCounter', '_hideLabel', '_hint', '_id', '_maxLength', '_name', '_on', '_placeholder', '_readOnly', '_required', '_resize', '_rows', '_tabIndex', '_touched', '_value']
})
export class KolTextarea {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolToast extends Components.KolToast {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_alert', '_hasCloser', '_heading', '_level', '_on', '_show', '_showDuration', '_type']
})
@Component({
  selector: 'kol-toast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_alert', '_hasCloser', '_heading', '_level', '_on', '_show', '_showDuration', '_type']
})
export class KolToast {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolTooltip extends Components.KolTooltip {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_align', '_id', '_label']
})
@Component({
  selector: 'kol-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_align', '_id', '_label']
})
export class KolTooltip {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface KolVersion extends Components.KolVersion {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['_version']
})
@Component({
  selector: 'kol-version',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['_version']
})
export class KolVersion {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
