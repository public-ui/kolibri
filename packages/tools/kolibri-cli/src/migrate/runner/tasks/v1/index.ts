import { AbstractTask } from '../../abstract-task';
import { LabelExpertSlot } from '../common/LabelExpertSlot';
import { MarkRemovedSlotTask } from '../common/MarkRemovedSlotTask';
import { RefactorPropertyLabelReplaceFalse } from '../common/RefactorPropertyLabelReplaceFalse';
import { RenameSlotNameTask } from '../common/RenameSlotNameTask';
import { AbbrRenamePropertyAlignToTooltipAlign, AbbrRenamePropertyTitleToLabel } from './abbr';
import { AccordionRenamePropertyHeadingToLabel } from './accordion';
import { BadgeRemovePropertyHideLabel, BadgeRemovePropertyIconOnly, BadgeRenamePropertyIconOnlyToHideLabel, BadgeRenamePropertyIconToIcons } from './badge';
import { BreadcrumbRenamePropertyAriaLabelToLabel } from './breadcrumb';
import {
	ButtonRefactorPropertyIconAlign,
	ButtonRemovePropertyAriaCurrent,
	ButtonRemovePropertyAriaLabel,
	ButtonRenamePropertyIconOnlyToHideLabel,
	ButtonRenamePropertyIconToIcons,
} from './button';
import {
	ButtonLinkRemovePropertyAriaCurrent,
	ButtonLinkRemovePropertyAriaLabel,
	ButtonLinkRenamePropertyIconOnlyToHideLabel,
	ButtonLinkRenamePropertyIconToIcons,
} from './button-link';
import { CardRenamePropertyHeadingToLabel, CardRenamePropertyHeadlineToLabel } from './card';
import { DetailsRenamePropertySummaryToLabel } from './details';
import { IconRemovePropertyPart, IconRenamePropertyAriaLabelToLabel, IconRenamePropertyIconToIcons } from './icon';
import { InputRenamePropertyIconToIcons } from './input';
import { InputCheckboxRenamePropertyIconToIcons, InputCheckboxRenamePropertyTypeToVariant } from './input-checkbox';
import { InputColorRenamePropertyIconToIcons, InputColorRenamePropertyListToSuggestions } from './input-color';
import { InputDateRenamePropertyIconToIcons, InputDateRenamePropertyListToSuggestions } from './input-date';
import { InputEmailRemovePropertySize, InputEmailRenamePropertyIconToIcons, InputEmailRenamePropertyListToSuggestions } from './input-email';
import { InputFileRenamePropertyIconToIcons } from './input-file';
import { InputNumberRemovePropertyType, InputNumberRenamePropertyIconToIcons, InputNumberRenamePropertyListToSuggestions } from './input-number';
import { InputPasswordRemovePropertySize, InputPasswordRenamePropertyIconToIcons } from './input-password';
import { InputRadioRenamePropertyListToOptions } from './input-radio';
import { InputRangeRenamePropertyIconToIcons, InputRangeRenamePropertyListToSuggestions } from './input-range';
import { InputTextRemovePropertySize, InputTextRenamePropertyIconToIcons, InputTextRenamePropertyListToSuggestions } from './input-text';
import {
	LinkRefactorPropertyIconAlign,
	LinkRemovePropertyAriaControls,
	LinkRemovePropertyAriaExpanded,
	LinkRemovePropertyAriaLabel,
	LinkRemovePropertyAriaSelected,
	LinkRemovePropertyDisabled,
	LinkRemovePropertySelector,
	LinkRemovePropertyStealth,
	LinkRemovePropertyUseCase,
	LinkRenamePropertyAriaCurrentToListenAriaCurrent,
	LinkRenamePropertyIconOnlyToHideLabel,
	LinkRenamePropertyIconToIcons,
} from './link';
import {
	LinkButtonRemovePropertyAriaControls,
	LinkButtonRemovePropertyAriaExpanded,
	LinkButtonRemovePropertyAriaLabel,
	LinkButtonRemovePropertyAriaSelected,
	LinkButtonRemovePropertyDisabled,
	LinkButtonRenamePropertyAriaCurrentToListenAriaCurrent,
	LinkButtonRenamePropertyIconOnlyToHideLabel,
	LinkButtonRenamePropertyIconToIcons,
} from './link-button';
import {
	LinkGroupRemovePropertyHeading,
	LinkGroupRemovePropertyOrdered,
	LinkGroupRenamePropertyAriaLabelToLabel,
	LinkGroupRenamePropertyHeadingToLabel,
} from './link-group';
import { LogoRenamePropertyAbbrToOrg } from './logo';
import { ModalRenamePropertyAriaLabelToLabel } from './modal';
import { NavRemovePropertyVariant, NavRenamePropertyAriaLabelToLabel, NavRenamePropertyCompactToHideLabel } from './nav';
import { PaginationRenamePropertyCountToTotal, PaginationRenamePropertyTotalToMax } from './pagination';
import { ProgressRenamePropertyTypeToVariant } from './progress';
import { QuoteRenamePropertyCaptionToLabel } from './quote';
import { SelectRemovePropertySize, SelectRenamePropertyHeightToRows, SelectRenamePropertyIconToIcons, SelectRenamePropertyListToOptions } from './select';
import { SkipNavButtonRenamePropertyAriaLabelToLabel } from './skip-nav';
import { SpanRenamePropertyIconOnlyToHideLabel, SpanRenamePropertyIconToIcons } from './span';
import {
	SplitButtonRemovePropertyAccessKey,
	SplitButtonRemovePropertyAriaLabel,
	SplitButtonRemovePropertyShowDropdown,
	SplitButtonRenamePropertyShow,
} from './split-button';
import { TableRenamePropertyCaptionToLabel } from './table';
import {
	TabsRenamePropertyAriaLabelToLabel,
	TabsRenamePropertyIconOnlyToHideLabel,
	TabsRenamePropertyIconToIcons,
	TabsRenamePropertyTabAlignToAlign,
} from './tabs';
import { ToastRemovePropertyNameShowDuration, ToastRenamePropertyHeadingToLabel } from './toast';
import { VersionRenamePropertyVersionToLabel } from './version';
import { AlertRenamePropertyHeadingToLabel } from './alert';
import { SymbolRenamePropertyAriaLabelToLabel } from './symbol';

export const v1Tasks: AbstractTask[] = [];
v1Tasks.push(AbbrRenamePropertyAlignToTooltipAlign);
v1Tasks.push(AbbrRenamePropertyTitleToLabel);
v1Tasks.push(AccordionRenamePropertyHeadingToLabel);
v1Tasks.push(AlertRenamePropertyHeadingToLabel);
v1Tasks.push(BadgeRemovePropertyHideLabel);
v1Tasks.push(BadgeRemovePropertyIconOnly);
v1Tasks.push(BadgeRenamePropertyIconOnlyToHideLabel);
v1Tasks.push(BadgeRenamePropertyIconToIcons);
v1Tasks.push(BreadcrumbRenamePropertyAriaLabelToLabel);
v1Tasks.push(ButtonLinkRemovePropertyAriaCurrent);
v1Tasks.push(ButtonLinkRemovePropertyAriaLabel);
v1Tasks.push(ButtonLinkRenamePropertyIconOnlyToHideLabel);
v1Tasks.push(ButtonLinkRenamePropertyIconToIcons);
v1Tasks.push(ButtonRemovePropertyAriaCurrent);
v1Tasks.push(ButtonRemovePropertyAriaLabel);
v1Tasks.push(ButtonRenamePropertyIconOnlyToHideLabel);
v1Tasks.push(ButtonRefactorPropertyIconAlign);
v1Tasks.push(ButtonRenamePropertyIconToIcons);
v1Tasks.push(CardRenamePropertyHeadingToLabel);
v1Tasks.push(CardRenamePropertyHeadlineToLabel);
v1Tasks.push(DetailsRenamePropertySummaryToLabel);
v1Tasks.push(IconRemovePropertyPart);
v1Tasks.push(IconRenamePropertyAriaLabelToLabel);
v1Tasks.push(IconRenamePropertyIconToIcons);
v1Tasks.push(InputCheckboxRenamePropertyIconToIcons);
v1Tasks.push(InputCheckboxRenamePropertyTypeToVariant);
v1Tasks.push(InputColorRenamePropertyIconToIcons);
v1Tasks.push(InputColorRenamePropertyListToSuggestions);
v1Tasks.push(InputDateRenamePropertyIconToIcons);
v1Tasks.push(InputDateRenamePropertyListToSuggestions);
v1Tasks.push(InputEmailRenamePropertyIconToIcons);
v1Tasks.push(InputEmailRenamePropertyListToSuggestions);
v1Tasks.push(InputEmailRemovePropertySize);
v1Tasks.push(InputFileRenamePropertyIconToIcons);
v1Tasks.push(InputNumberRenamePropertyIconToIcons);
v1Tasks.push(InputNumberRenamePropertyListToSuggestions);
v1Tasks.push(InputNumberRemovePropertyType);
v1Tasks.push(InputPasswordRenamePropertyIconToIcons);
v1Tasks.push(InputPasswordRemovePropertySize);
v1Tasks.push(InputRadioRenamePropertyListToOptions);
v1Tasks.push(InputRangeRenamePropertyIconToIcons);
v1Tasks.push(InputRangeRenamePropertyListToSuggestions);
v1Tasks.push(InputRenamePropertyIconToIcons);
v1Tasks.push(InputTextRenamePropertyIconToIcons);
v1Tasks.push(InputTextRenamePropertyListToSuggestions);
v1Tasks.push(InputTextRemovePropertySize);
v1Tasks.push(LinkButtonRemovePropertyAriaControls);
v1Tasks.push(LinkButtonRemovePropertyAriaExpanded);
v1Tasks.push(LinkButtonRemovePropertyAriaLabel);
v1Tasks.push(LinkButtonRemovePropertyAriaSelected);
v1Tasks.push(LinkButtonRemovePropertyDisabled);
v1Tasks.push(LinkButtonRenamePropertyAriaCurrentToListenAriaCurrent);
v1Tasks.push(LinkButtonRenamePropertyIconOnlyToHideLabel);
v1Tasks.push(LinkButtonRenamePropertyIconToIcons);
v1Tasks.push(LinkGroupRemovePropertyHeading);
v1Tasks.push(LinkGroupRemovePropertyOrdered);
v1Tasks.push(LinkGroupRenamePropertyAriaLabelToLabel);
v1Tasks.push(LinkGroupRenamePropertyHeadingToLabel);
v1Tasks.push(LinkRemovePropertyAriaControls);
v1Tasks.push(LinkRemovePropertyAriaExpanded);
v1Tasks.push(LinkRemovePropertyAriaLabel);
v1Tasks.push(LinkRemovePropertyAriaSelected);
v1Tasks.push(LinkRemovePropertyDisabled);
v1Tasks.push(LinkRefactorPropertyIconAlign);
v1Tasks.push(LinkRemovePropertySelector);
v1Tasks.push(LinkRemovePropertyStealth);
v1Tasks.push(LinkRemovePropertyUseCase);
v1Tasks.push(LinkRenamePropertyAriaCurrentToListenAriaCurrent);
v1Tasks.push(LinkRenamePropertyIconOnlyToHideLabel);
v1Tasks.push(LinkRenamePropertyIconToIcons);
v1Tasks.push(LogoRenamePropertyAbbrToOrg);
v1Tasks.push(ModalRenamePropertyAriaLabelToLabel);
// v1Tasks.push(NavRemovePropertyHasCompactButton);
v1Tasks.push(NavRemovePropertyVariant);
v1Tasks.push(NavRenamePropertyAriaLabelToLabel);
v1Tasks.push(NavRenamePropertyCompactToHideLabel);
v1Tasks.push(PaginationRenamePropertyCountToTotal);
v1Tasks.push(PaginationRenamePropertyTotalToMax);
v1Tasks.push(ProgressRenamePropertyTypeToVariant);
v1Tasks.push(QuoteRenamePropertyCaptionToLabel);
v1Tasks.push(SelectRenamePropertyHeightToRows);
v1Tasks.push(SelectRenamePropertyIconToIcons);
v1Tasks.push(SelectRenamePropertyListToOptions);
v1Tasks.push(SelectRemovePropertySize);
v1Tasks.push(SkipNavButtonRenamePropertyAriaLabelToLabel);
v1Tasks.push(SpanRenamePropertyIconOnlyToHideLabel);
v1Tasks.push(SpanRenamePropertyIconToIcons);
v1Tasks.push(SplitButtonRemovePropertyAriaLabel);
v1Tasks.push(SplitButtonRemovePropertyAccessKey);
v1Tasks.push(SplitButtonRemovePropertyShowDropdown);
v1Tasks.push(SplitButtonRenamePropertyShow);
v1Tasks.push(SymbolRenamePropertyAriaLabelToLabel);
v1Tasks.push(TableRenamePropertyCaptionToLabel);
v1Tasks.push(TabsRenamePropertyAriaLabelToLabel);
v1Tasks.push(TabsRenamePropertyIconToIcons);
v1Tasks.push(TabsRenamePropertyTabAlignToAlign);
v1Tasks.push(TabsRenamePropertyIconOnlyToHideLabel);
v1Tasks.push(ToastRemovePropertyNameShowDuration);
v1Tasks.push(ToastRenamePropertyHeadingToLabel);
v1Tasks.push(VersionRenamePropertyVersionToLabel);

v1Tasks.push(LabelExpertSlot.getInstance('kol-heading', '_label', '^1'));
v1Tasks.push(LabelExpertSlot.getInstance('kol-input-checkbox', '_label', '^1'));
v1Tasks.push(LabelExpertSlot.getInstance('kol-input-color', '_label', '^1'));
v1Tasks.push(LabelExpertSlot.getInstance('kol-input-date', '_label', '^1'));
v1Tasks.push(LabelExpertSlot.getInstance('kol-input-email', '_label', '^1'));
v1Tasks.push(LabelExpertSlot.getInstance('kol-input-file', '_label', '^1'));
v1Tasks.push(LabelExpertSlot.getInstance('kol-input-number', '_label', '^1'));
v1Tasks.push(LabelExpertSlot.getInstance('kol-input-password', '_label', '^1'));
v1Tasks.push(LabelExpertSlot.getInstance('kol-input-radio', '_label', '^1'));
v1Tasks.push(LabelExpertSlot.getInstance('kol-input-range', '_label', '^1'));
v1Tasks.push(LabelExpertSlot.getInstance('kol-input-text', '_label', '^1'));
v1Tasks.push(LabelExpertSlot.getInstance('kol-link', '_label', '^1'));
v1Tasks.push(LabelExpertSlot.getInstance('kol-select', '_label', '^1'));
v1Tasks.push(LabelExpertSlot.getInstance('kol-textarea', '_label', '^1'));

v1Tasks.push(MarkRemovedSlotTask.getInstance('kol-accordion', 'header', '^1'));
v1Tasks.push(MarkRemovedSlotTask.getInstance('kol-card', 'footer', '^1'));
v1Tasks.push(MarkRemovedSlotTask.getInstance('kol-card', 'header', '^1'));

v1Tasks.push(RenameSlotNameTask.getInstance('kol-accordion', 'content', '', '^1'));
v1Tasks.push(RenameSlotNameTask.getInstance('kol-card', 'content', '', '^1'));

v1Tasks.push(RefactorPropertyLabelReplaceFalse.getInstance());
