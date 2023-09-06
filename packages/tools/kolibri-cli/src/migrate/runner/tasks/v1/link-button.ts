import { RemovePropertyNameTask } from '../common/RemovePropertyNameTask';
import { RenamePropertyNameTask } from '../common/RenamePropertyNameTask';

export const LinkButtonRemovePropertyAriaControl = RemovePropertyNameTask.getInstance('kol-link-button', '_aria-control', '^1');
export const LinkButtonRenamePropertyAriaCurrentToListenAriaCurrent = RenamePropertyNameTask.getInstance(
	'kol-link-button',
	'_aria-current',
	'_listen-aria-current',
	'^1',
);
export const LinkButtonRemovePropertyAriaExpanded = RemovePropertyNameTask.getInstance('kol-link-button', '_aria-expanded', '^1');
export const LinkButtonRemovePropertyAriaLabel = RemovePropertyNameTask.getInstance('kol-link-button', '_aria-label', '^1');
export const LinkButtonRemovePropertyAriaSelected = RemovePropertyNameTask.getInstance('kol-link-button', '_aria-selected', '^1');
export const LinkButtonRemovePropertyDisabled = RemovePropertyNameTask.getInstance('kol-link-button', '_disabled', '^1');
export const LinkButtonRenamePropertyIconOnlyToHideLabel = RenamePropertyNameTask.getInstance('kol-link-button', '_icon-only', '_hide-label', '^1');
