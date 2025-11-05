/**
 * Simple in-memory data store for samples and docs
 * In a real implementation, this would load from the actual KoliBri package
 */

export interface SampleEntry {
	id: string;
	kind: 'sample' | 'doc';
	name: string;
	group?: string;
	description?: string;
	tags?: string[];
	code?: string;
}

// Example samples - in production these would be loaded from the actual components
export const SAMPLE_DATA: SampleEntry[] = [
	{
		id: 'button/basic',
		kind: 'sample',
		name: 'Basic Button',
		group: 'button',
		description: 'A basic button component example',
		tags: ['button', 'interactive', 'form'],
		code: `import { KolButton } from '@public-ui/react';

export const BasicButton = () => (
  <KolButton _label="Click me" />
);`,
	},
	{
		id: 'input/text',
		kind: 'sample',
		name: 'Text Input',
		group: 'input',
		description: 'A text input field example',
		tags: ['input', 'form', 'text'],
		code: `import { KolInput } from '@public-ui/react';

export const TextInput = () => (
  <KolInput _type="text" _label="Username" />
);`,
	},
	{
		id: 'table/basic',
		kind: 'sample',
		name: 'Basic Table',
		group: 'table',
		description: 'A basic table component example',
		tags: ['table', 'data', 'grid'],
		code: `import { KolTable } from '@public-ui/react';

export const BasicTable = () => (
  <KolTable _label="User table" _data={[...]} />
);`,
	},
	{
		id: 'docs/getting-started',
		kind: 'doc',
		name: 'Getting Started',
		description: 'Introduction to KoliBri component library',
		tags: ['documentation', 'guide', 'setup'],
		code: `# Getting Started with KoliBri

KoliBri is an accessible web component library...`,
	},
	{
		id: 'docs/accessibility',
		kind: 'doc',
		name: 'Accessibility Guide',
		description: 'Best practices for accessibility in KoliBri',
		tags: ['documentation', 'a11y', 'accessibility'],
		code: `# Accessibility in KoliBri

All KoliBri components follow WCAG 2.1 guidelines...`,
	},
];

export function getAllEntries(): SampleEntry[] {
	return SAMPLE_DATA;
}

export function getEntriesByKind(kind: 'sample' | 'doc'): SampleEntry[] {
	return SAMPLE_DATA.filter((entry) => entry.kind === kind);
}

export function getEntryById(id: string): SampleEntry | undefined {
	return SAMPLE_DATA.find((entry) => entry.id === id);
}
