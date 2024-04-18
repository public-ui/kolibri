import { mixMembers } from 'stencil-awesome-test';

import { KolButtonTag, KolButtonWcTag, KolLinkWcTag } from '../../../core/component-names';

import type { ButtonOrLinkOrTextWithChildrenProps, LinkProps, LinkWithChildrenProps, NavProps } from '@public-ui/schema';
import { translate } from '../../../i18n';

export const getNavHtml = (props: NavProps): string => {
	props = mixMembers(
		{
			_collapsible: true,
			_hasCompactButton: false,
			_hasIconsWhenExpanded: false,
			_hideLabel: false,
			_label: '', // ⚠ required
			_links: [],
			_orientation: 'vertical',
			_expandedChildren: [],
		},
		props,
	);
	const entryIsLink = (entryProps: ButtonOrLinkOrTextWithChildrenProps): entryProps is LinkWithChildrenProps => {
		return typeof (entryProps as LinkProps)._href === 'string';
	};
	const listItems = (props._links as [])
		.map((link: ButtonOrLinkOrTextWithChildrenProps) => {
			const expanded = false;
			const icons =
				props._hasIconsWhenExpanded || props._hideLabel ? link._icons || (props._hideLabel ? 'codicon codicon-symbol-method' : undefined) : undefined;
			return `<li ${link._active ? 'class="active"' : link._children ? 'class="has-children"' : ''}>
								<div class="entry ${props._hideLabel ? 'hide-label' : ''}">
									${
										entryIsLink(link)
											? `<${KolLinkWcTag} ${typeof icons === 'string' ? `_icons="${icons}"` : ''} ${props._hideLabel ? '_hidelabel=""' : ''} ${link._active ? '_active=""' : ''} _href="${link._href}" _label="${link._label}" class="entry-item"></${KolLinkWcTag}>`
											: `<${KolButtonWcTag} ${props._hideLabel ? '_hidelabel=""' : ''}  _label="${link._label}" class="entry-item"  ${typeof icons === 'string' ? `_icons="${icons}"` : ''} ></${KolButtonWcTag}>`
									}			${
										link._children
											? `<${KolButtonWcTag} _hidelabel="" _label="${`Untermenü zu ${link._label} ${expanded ? 'schließen' : 'öffnen'}`}" class="expand-button" _icons="codicon codicon-${expanded ? 'remove' : 'add'}"  ></${KolButtonWcTag}>`
											: ''
									}
								</div>
							</li>
						 `;
		})
		.join('');
	return `
<kol-nav class="kol-nav">
	<mock:shadow-root>
	<div class="${props._hideLabel ? 'is-compact' : ''} nav vertical">
	      <nav aria-label="${props._label ? props._label : ''}" id="nav">
	         <ul class="list vertical" data-deep="0" >
					${listItems}
					 </ul>
	       </nav>
				 ${
						props._hasCompactButton
							? `
								<div class="compact">
							 		<${KolButtonTag}
											_ariacontrols="nav"
											${props._hideLabel ? '' : '_ariaexpanded=""'} ${props._hideLabel ? '_hidelabel=""' : '_hidelabel=""'}
											_icons="${props._hideLabel ? 'codicon codicon-chevron-right' : 'codicon codicon-chevron-left'}"
											_label="${translate(props._hideLabel ? 'kol-nav-maximize' : 'kol-nav-minimize')}"
											_tooltipalign="right"
											_variant="ghost"
									 >
									</${KolButtonTag}>
						 		</div>`
							: ''
					}
	   </div>
	</mock:shadow-root>
</kol-nav>
`;
};
