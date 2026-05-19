import { newSpecPage } from '@stencil/core/testing';
import { KolNavTag } from '../../../core/component-names';
import type { NavProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';
import { KolNav } from '../shadow';

const baseObj: NavProps = {
	_label: 'Nav Label',
	_links: [
		{
			_label: 'Homepage',
			_href: '#',
		},
		{
			_label: 'Nav - aria-current',
			_href: '#',
			_active: true,
		},
		{
			_label: '3 Navigation point',
			_href: '#',
			_icons: 'codicon codicon-home',

			_children: [
				{
					_label: '3.1 Navigation point',
					_icons: 'codicon codicon-home',
					_href: '#',
				},
			],
		},

		{
			_label: '6 Keine eigene Seite, mit Icon',
			_icons: 'codicon codicon-squirrel',
		},
	],
};

executeSnapshotTests<NavProps>(
	KolNavTag,
	[KolNav],
	[
		{ ...baseObj },
		{ ...baseObj, _hasIconsWhenExpanded: false },
		{ ...baseObj, _hasIconsWhenExpanded: true },
		{ ...baseObj, _hideLabel: false },
		{ ...baseObj, _hideLabel: true },
		{ ...baseObj, _hasCompactButton: false },
		{ ...baseObj, _hasCompactButton: true },
	],
);

describe('KolNav nested navigation landmarks', () => {
	it('assigns a single nav id and multiple ul ids for expanded submenus', async () => {
		const onClick = jest.fn();
		const page = await newSpecPage({
			components: [KolNav],
			html: `<kol-nav></kol-nav>`,
		});

		const instance = page.rootInstance as KolNav;
		instance.validateLabel('Main navigation', undefined, true);
		instance.validateLinks([
			{
				_label: 'Section',
				_href: '#section',
				_children: [
					{
						_label: 'Child link',
						_href: '#child-link',
						_children: [
							{
								_label: 'Grandchild info',
								_active: true,
							},
						],
					},
					{
						_label: 'Child button',
						_on: { onClick },
					},
					{
						_label: 'Child hint',
					},
				],
			},
		]);

		await page.waitForChanges();

		// Snapshot of the navigation
		expect(page.root).toMatchSnapshot();

		// There should be only one nav element with an id
		const nav = page.root!.shadowRoot!.querySelector('nav');
		expect(nav).not.toBeNull();
		expect(nav!.id).toBe('kol-nav--nonce');

		// There should be multiple ul elements with unique ids for expanded lists
		const ulElements = Array.from(page.root!.shadowRoot!.querySelectorAll('ul[id^="kol-nav-list"]'));
		expect(ulElements.length).toBeGreaterThan(1);
		ulElements.forEach((ul) => {
			expect(ul.id.startsWith('kol-nav-list')).toBe(true);
		});

		// Check the IDs of submenu ul elements (all ul with id starting with kol-nav-list)
		const submenuUls = Array.from(page.root!.shadowRoot!.querySelectorAll('ul[id^="kol-nav-list"]'));
		expect(submenuUls.length).toBeGreaterThan(0);
		submenuUls.forEach((ul) => {
			expect(ul.id).toMatch(/^kol-nav-list/);
		});

		// Each toggle should have _ariacontrols pointing to a ul id
		const toggles = Array.from(page.root!.shadowRoot!.querySelectorAll('.kol-nav__entry--link[_ariacontrols]'));
		toggles.forEach((toggle) => {
			const controls = toggle.getAttribute('_ariacontrols');
			expect(controls).toMatch(/^kol-nav-list/);
			// The referenced ul should exist
			expect(page.root!.shadowRoot!.querySelector(`ul#${controls}`)).not.toBeNull();
		});
	});
});
