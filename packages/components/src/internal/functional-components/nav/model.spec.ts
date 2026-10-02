import type { ButtonOrLinkOrTextWithChildrenProps } from '../../../schema';
import { buildEntryIcons, getInitiallyExpanded, getLeftIcon, isButtonEntry, isLinkEntry, toggleExpanded } from './model';

describe('nav model', () => {
	describe('getInitiallyExpanded', () => {
		it('expands the children of an active entry and of every ancestor of an active entry, deepest first', () => {
			const grandchildren: ButtonOrLinkOrTextWithChildrenProps[] = [{ _label: 'Grandchild', _href: '#', _active: true }];
			const children: ButtonOrLinkOrTextWithChildrenProps[] = [{ _label: 'Child', _children: grandchildren }];
			const activeChildren: ButtonOrLinkOrTextWithChildrenProps[] = [{ _label: 'Active child', _href: '#' }];
			const links: ButtonOrLinkOrTextWithChildrenProps[] = [
				{ _label: 'Section', _children: children },
				{ _label: 'Active', _active: true, _children: activeChildren },
				{ _label: 'Closed', _children: [{ _label: 'Inactive', _href: '#' }] },
			];

			const expanded = getInitiallyExpanded(links);

			expect(expanded).toHaveLength(3);
			expect(expanded[0]).toBe(grandchildren);
			expect(expanded[1]).toBe(children);
			expect(expanded[2]).toBe(activeChildren);
		});

		it('follows only the first active path of an entry', () => {
			const first: ButtonOrLinkOrTextWithChildrenProps[] = [{ _label: 'A', _active: true }];
			const second: ButtonOrLinkOrTextWithChildrenProps[] = [{ _label: 'B', _active: true }];
			const children: ButtonOrLinkOrTextWithChildrenProps[] = [
				{ _label: 'First', _children: first },
				{ _label: 'Second', _children: second },
			];

			expect(getInitiallyExpanded([{ _label: 'Section', _children: children }])).toEqual([first, children]);
		});

		it('expands nothing without an active entry', () => {
			expect(getInitiallyExpanded([{ _label: 'Section', _children: [{ _label: 'Child', _href: '#' }] }])).toEqual([]);
		});
	});

	it('toggles the children by identity', () => {
		const a: ButtonOrLinkOrTextWithChildrenProps[] = [];
		const b: ButtonOrLinkOrTextWithChildrenProps[] = [];
		const expanded = toggleExpanded([a], b);
		expect(expanded).toEqual([a, b]);
		expect(toggleExpanded(expanded, a)).toEqual([b]);
	});

	it('reads the left icon from a string or the left icon', () => {
		expect(getLeftIcon({ _label: 'A', _icons: 'kolicon-home' })).toBe('kolicon-home');
		expect(getLeftIcon({ _label: 'A', _icons: { left: 'kolicon-home', right: 'kolicon-link' } })).toBe('kolicon-home');
		expect(getLeftIcon({ _label: 'A', _icons: { right: 'kolicon-link' } })).toBeUndefined();
		expect(getLeftIcon({ _label: 'A' })).toBeUndefined();
	});

	it('tells link, button and text entries apart', () => {
		expect(isLinkEntry({ _label: 'Link', _href: '#' })).toBe(true);
		expect(isButtonEntry({ _label: 'Button', _on: { onClick: () => undefined } })).toBe(true);
		expect(isLinkEntry({ _label: 'Text' })).toBe(false);
		expect(isButtonEntry({ _label: 'Text' })).toBe(false);
	});

	describe('buildEntryIcons', () => {
		const base = { collapsible: false, expanded: false, hasIconsWhenExpanded: false, hideLabel: false };

		it('shows no icon by default', () => {
			expect(buildEntryIcons({ ...base, leftIcon: 'kolicon-home' })).toEqual({ left: '', right: '' });
		});

		it('shows the left icon with hasIconsWhenExpanded', () => {
			expect(buildEntryIcons({ ...base, hasIconsWhenExpanded: true, leftIcon: 'kolicon-home' })).toEqual({ left: 'kolicon-home', right: '' });
		});

		it('shows the left icon or kolicon-link in the compact view', () => {
			expect(buildEntryIcons({ ...base, hideLabel: true, leftIcon: 'kolicon-home' }).left).toBe('kolicon-home');
			expect(buildEntryIcons({ ...base, hideLabel: true }).left).toBe('kolicon-link');
			expect(buildEntryIcons({ ...base, hideLabel: true, leftIcon: '' }).left).toBe('kolicon-link');
		});

		it('shows plus or minus for a collapsible entry', () => {
			expect(buildEntryIcons({ ...base, collapsible: true }).right).toBe('kolicon-plus');
			expect(buildEntryIcons({ ...base, collapsible: true, expanded: true }).right).toBe('kolicon-minus');
		});
	});
});
