import type { TagType } from './types';

export const TEST_ITERATIONS = parseInt(process.env.TEST_ITERATIONS || '50', 10);
export const TEST_BATCH_SIZE = parseInt(process.env.TEST_BATCH_SIZE || '100', 10);
export const TEST_TIMEOUT = parseInt(process.env.TEST_TIMEOUT || '10000', 10);
export const TEST_URL = 'http://localhost:3000/test-page.html';

export const TAGS = [
	'kol-abbr',
	'kol-accordion',
	'kol-alert',
	'kol-avatar',
	'kol-badge',
	'kol-breadcrumb',
	'kol-button',
	'kol-button-link',
	'kol-card',
	'kol-details',
	'kol-drawer',
	'kol-form',
	'kol-heading',
	'kol-icon',
	'kol-image',
	'kol-input-checkbox',
	'kol-input-color',
	'kol-input-date',
	'kol-input-email',
	'kol-input-file',
	'kol-input-number',
	'kol-input-password',
	'kol-input-radio',
	'kol-input-text',
	// 'kol-kolibri',
	'kol-link',
	'kol-link-button',
	'kol-modal',
	'kol-nav',
	'kol-pagination',
	'kol-popover-button',
	'kol-progress',
	'kol-quote',
	'kol-select',
	'kol-skip-nav',
	'kol-spin',
	'kol-split-button',
	'kol-table-stateful',
	'kol-table-stateless',
	'kol-tabs',
	'kol-textarea',
	// 'kol-toast-container',
	'kol-toolbar',
	'kol-tree',
	'kol-tree-item',
	'kol-version',
] as const;

export const createResultsMap = (): Map<TagType, number[]> => {
	return new Map<TagType, number[]>(TAGS.map((tag) => [tag, []]));
};
