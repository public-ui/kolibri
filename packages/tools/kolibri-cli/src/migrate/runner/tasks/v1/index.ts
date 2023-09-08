import { AbstractTask } from '../../abstract-task';
import { LabelExpertSlot } from '../common/LabelExpertSlot';
import { AbbrRenamePropertyTitleToLabel } from './abbr';
import { AccordionRenamePropertyHeadingToLabel } from './accordion';
import {
    BadgeRemovePropertyHideLabel, BadgeRemovePropertyIconOnly,
    BadgeRenamePropertyIconOnlyToHideLabel
} from './badge';
import { BreadcrumbRenamePropertyAriaLabelToLabel } from './breadcrumb';
import {
    ButtonRemovePropertyAriaCurrent, ButtonRemovePropertyAriaLabel, ButtonRemovePropertyIconAlign,
    ButtonRenamePropertyIconOnlyToHideLabel
} from './button';
import {
    ButtonLinkRemovePropertyAriaCurrent, ButtonLinkRemovePropertyAriaLabel,
    ButtonLinkRenamePropertyIconOnlyToHideLabel
} from './button-link';
import { CardRenamePropertyHeadingToLabel, CardRenamePropertyHeadlineToLabel } from './card';
import { DetailsRenamePropertySummaryToLabel } from './details';
import { IconRemovePropertyPart, IconRenamePropertyAriaLabelToLabel } from './icon';
import { InputCheckboxRenamePropertyTypeToVariant } from './input-checkbox';
import { InputColorRenamePropertyListToSuggestions } from './input-color';
import { InputDateRenamePropertyListToSuggestions } from './input-date';
import { InputEmailRenamePropertyListToSuggestions } from './input-email';
import { InputNumberRenamePropertyListToSuggestions } from './input-number';
import { InputRadioRenamePropertyListToSuggestions } from './input-radio';
import { InputRangeRenamePropertyListToSuggestions } from './input-range';
import { InputTextRenamePropertyListToSuggestions } from './input-text';
import {
    LinkRemovePropertyAriaControl, LinkRemovePropertyAriaExpanded, LinkRemovePropertyAriaLabel,
    LinkRemovePropertyAriaSelected, LinkRemovePropertyDisabled, LinkRemovePropertyIconAlign,
    LinkRemovePropertySelector, LinkRemovePropertyStealth, LinkRemovePropertyUseCase,
    LinkRenamePropertyAriaCurrentToListenAriaCurrent, LinkRenamePropertyIconOnlyToHideLabel
} from './link';
import {
    LinkButtonRemovePropertyAriaControl, LinkButtonRemovePropertyAriaExpanded,
    LinkButtonRemovePropertyAriaLabel, LinkButtonRemovePropertyAriaSelected,
    LinkButtonRemovePropertyDisabled, LinkButtonRenamePropertyAriaCurrentToListenAriaCurrent,
    LinkButtonRenamePropertyIconOnlyToHideLabel
} from './link-button';
import {
    LinkGroupRemovePropertyHeading, LinkGroupRemovePropertyOrdered,
    LinkGroupRenamePropertyAriaLabelToLabel, LinkGroupRenamePropertyHeadingToLabel
} from './link-group';
import { LogoRenamePropertyAbbrToOrg } from './logo';
import { ModalRenamePropertyAriaLabelToLabel } from './modal';
import {
    NavRemovePropertyHasCompactButton, NavRemovePropertyVariant, NavRenamePropertyAriaLabelToLabel,
    NavRenamePropertyCompactToHideLabel
} from './nav';
import { PaginationRenamePropertyCountToTotal } from './pagination';
import { ProgressRenamePropertyTypeToVariant } from './progress';
import { QuoteRenamePropertyCaptionToLabel } from './quote';
import { SelectRenamePropertyHeightToRows, SelectRenamePropertyListToOptions } from './select';
import { SkipNavButtonRenamePropertyAriaLabelToLabel } from './skip-nav';
import { SpanRenamePropertyIconOnlyToHideLabel } from './span';
import { SplitButtonRemovePropertyAriaLabel } from './split-button';
import { TableRenamePropertyCaptionToLabel } from './table';
import { TabsRenamePropertyAriaLabelToLabel, TabsRenamePropertyTabAlignToAlign } from './tabs';
import { ToastRenamePropertyHeadingToLabel } from './toast';
import { VersionRenamePropertyVersionToLabel } from './version';

export const v1Tasks: AbstractTask[] = [];
v1Tasks.push(AbbrRenamePropertyTitleToLabel);
v1Tasks.push(AccordionRenamePropertyHeadingToLabel);
v1Tasks.push(BadgeRemovePropertyHideLabel);
v1Tasks.push(BadgeRemovePropertyIconOnly);
v1Tasks.push(BadgeRenamePropertyIconOnlyToHideLabel);
v1Tasks.push(BreadcrumbRenamePropertyAriaLabelToLabel);
v1Tasks.push(ButtonLinkRemovePropertyAriaCurrent);
v1Tasks.push(ButtonLinkRemovePropertyAriaLabel);
v1Tasks.push(ButtonLinkRenamePropertyIconOnlyToHideLabel);
v1Tasks.push(ButtonRemovePropertyAriaCurrent);
v1Tasks.push(ButtonRemovePropertyAriaLabel);
v1Tasks.push(ButtonRemovePropertyIconAlign);
v1Tasks.push(ButtonRenamePropertyIconOnlyToHideLabel);
v1Tasks.push(CardRenamePropertyHeadingToLabel);
v1Tasks.push(CardRenamePropertyHeadlineToLabel);
v1Tasks.push(DetailsRenamePropertySummaryToLabel);
v1Tasks.push(IconRemovePropertyPart);
v1Tasks.push(IconRenamePropertyAriaLabelToLabel);
v1Tasks.push(InputCheckboxRenamePropertyTypeToVariant);
v1Tasks.push(InputColorRenamePropertyListToSuggestions);
v1Tasks.push(InputDateRenamePropertyListToSuggestions);
v1Tasks.push(InputEmailRenamePropertyListToSuggestions);
v1Tasks.push(InputNumberRenamePropertyListToSuggestions);
v1Tasks.push(InputRadioRenamePropertyListToSuggestions);
v1Tasks.push(InputRangeRenamePropertyListToSuggestions);
v1Tasks.push(InputTextRenamePropertyListToSuggestions);
v1Tasks.push(LinkButtonRemovePropertyAriaControl);
v1Tasks.push(LinkButtonRenamePropertyAriaCurrentToListenAriaCurrent);
v1Tasks.push(LinkButtonRemovePropertyAriaExpanded);
v1Tasks.push(LinkButtonRemovePropertyAriaLabel);
v1Tasks.push(LinkButtonRemovePropertyAriaSelected);
v1Tasks.push(LinkButtonRemovePropertyDisabled);
v1Tasks.push(LinkButtonRenamePropertyIconOnlyToHideLabel);
v1Tasks.push(LinkRemovePropertyAriaControl);
v1Tasks.push(LinkRenamePropertyAriaCurrentToListenAriaCurrent);
v1Tasks.push(LinkRemovePropertyAriaExpanded);
v1Tasks.push(LinkRemovePropertyAriaLabel);
v1Tasks.push(LinkRemovePropertyAriaSelected);
v1Tasks.push(LinkRemovePropertyDisabled);
v1Tasks.push(LinkRemovePropertyIconAlign);
v1Tasks.push(LinkRenamePropertyIconOnlyToHideLabel);
v1Tasks.push(LinkRemovePropertySelector);
v1Tasks.push(LinkRemovePropertyStealth);
v1Tasks.push(LinkRemovePropertyUseCase);
v1Tasks.push(LogoRenamePropertyAbbrToOrg);
v1Tasks.push(LinkGroupRenamePropertyAriaLabelToLabel);
v1Tasks.push(LinkGroupRenamePropertyHeadingToLabel);
v1Tasks.push(LinkGroupRemovePropertyHeading);
v1Tasks.push(LinkGroupRemovePropertyOrdered);
v1Tasks.push(ModalRenamePropertyAriaLabelToLabel);
v1Tasks.push(NavRenamePropertyAriaLabelToLabel);
v1Tasks.push(NavRenamePropertyCompactToHideLabel);
v1Tasks.push(NavRemovePropertyHasCompactButton);
v1Tasks.push(NavRemovePropertyVariant);
v1Tasks.push(NavRenamePropertyCompactToHideLabel);
v1Tasks.push(PaginationRenamePropertyCountToTotal);
v1Tasks.push(ProgressRenamePropertyTypeToVariant);
v1Tasks.push(QuoteRenamePropertyCaptionToLabel);
v1Tasks.push(SelectRenamePropertyHeightToRows);
v1Tasks.push(SelectRenamePropertyListToOptions);
v1Tasks.push(SkipNavButtonRenamePropertyAriaLabelToLabel);
v1Tasks.push(SpanRenamePropertyIconOnlyToHideLabel);
v1Tasks.push(SplitButtonRemovePropertyAriaLabel);
v1Tasks.push(TableRenamePropertyCaptionToLabel);
v1Tasks.push(TabsRenamePropertyAriaLabelToLabel);
v1Tasks.push(TabsRenamePropertyTabAlignToAlign);
v1Tasks.push(ToastRenamePropertyHeadingToLabel);
v1Tasks.push(VersionRenamePropertyVersionToLabel);

v1Tasks.push(LabelExpertSlot.getInstance('kol-heading', '_label', '^1'));
// v1Tasks.push(LabelExpertSlot.getInstance('kol-input-checkbox', '_label', '^1'));
// v1Tasks.push(LabelExpertSlot.getInstance('kol-input-color', '_label', '^1'));
// v1Tasks.push(LabelExpertSlot.getInstance('kol-input-date', '_label', '^1'));
// v1Tasks.push(LabelExpertSlot.getInstance('kol-input-email', '_label', '^1'));
// v1Tasks.push(LabelExpertSlot.getInstance('kol-input-file', '_label', '^1'));
// v1Tasks.push(LabelExpertSlot.getInstance('kol-input-number', '_label', '^1'));
// v1Tasks.push(LabelExpertSlot.getInstance('kol-input-password', '_label', '^1'));
// v1Tasks.push(LabelExpertSlot.getInstance('kol-input-radio', '_label', '^1'));
// v1Tasks.push(LabelExpertSlot.getInstance('kol-input-range', '_label', '^1'));
// v1Tasks.push(LabelExpertSlot.getInstance('kol-input-text', '_label', '^1'));
v1Tasks.push(LabelExpertSlot.getInstance('kol-link', '_label', '^1'));
// v1Tasks.push(LabelExpertSlot.getInstance('kol-select', '_label', '^1'));
// v1Tasks.push(LabelExpertSlot.getInstance('kol-textarea', '_label', '^1'));
