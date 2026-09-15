import { test } from '@playwright/test';

test.use({
	colorScheme: 'light',
	locale: 'de-DE',
	isMobile: false,
	timezoneId: 'Europe/Berlin',
	viewport: {
		width: 800,
		height: 0,
	},
});

test('probe alert card-variant closer colors (warning block)', async ({ page }) => {
	await page.goto('/#alert/card-msg?hideMenus');
	await page.waitForLoadState('networkidle');
	await page.waitForSelector('.loading', { state: 'hidden' });

	const result = await page.evaluate(() => {
		function collectShadowRoots(root, acc) {
			acc.push(root);
			const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
			let node = walker.currentNode;
			while (node) {
				if (node.shadowRoot) {
					collectShadowRoots(node.shadowRoot, acc);
				}
				node = walker.nextNode();
			}
		}
		const roots = [];
		collectShadowRoots(document, roots);

		const block = document.querySelector('[data-visual-block="warning"]');
		const closers = [];
		// query across all shadow roots within the block for .kol-alert__closer
		for (const root of roots) {
			const found = root.querySelectorAll('.kol-alert__closer');
			found.forEach((el) => {
				if (block && block.contains(el.getRootNode().host ?? el)) {
					closers.push(el);
				}
			});
		}

		return closers.map((el, i) => {
			const cs = getComputedStyle(el);
			const icon = el.querySelector('.kol-icon') || el.querySelector('[class*="icon"]');
			const iconCs = icon ? getComputedStyle(icon) : null;
			const rect = el.getBoundingClientRect();
			const parent = el.parentElement;
			const parentCs = parent ? getComputedStyle(parent) : null;
			const textSpan = el.querySelector('.kol-button__text');
			const textCs = textSpan ? getComputedStyle(textSpan) : null;
			const textRect = textSpan ? textSpan.getBoundingClientRect() : null;
			const button = el.querySelector('button') || el;
			const buttonCs = getComputedStyle(button);
			const buttonRect = button.getBoundingClientRect();
			const iconRect = icon ? icon.getBoundingClientRect() : null;
			const closerCs = getComputedStyle(el);
			const extra = {
				textSpanHeight: textRect ? textRect.height : null,
				textSpanPadding: textCs ? textCs.padding : null,
				textSpanLineHeight: textCs ? textCs.lineHeight : null,
				textSpanBoxSizing: textCs ? textCs.boxSizing : null,
				buttonTag: button.tagName,
				buttonClass: button.className,
				buttonHeight: buttonRect.height,
				buttonComputedHeight: buttonCs.height,
				buttonMinHeight: buttonCs.minHeight,
				buttonAlignSelf: buttonCs.alignSelf,
				buttonDisplay: buttonCs.display,
				buttonAlignItems: buttonCs.alignItems,
				closerAlignItems: closerCs.alignItems,
				closerJustifyContent: closerCs.justifyContent,
				closerFlexDirection: closerCs.flexDirection,
				iconHeight: iconRect ? iconRect.height : null,
				iconFontSize: iconCs ? iconCs.fontSize : null,
				iconLineHeight: iconCs ? iconCs.lineHeight : null,
			};
			return {
				...extra,
				index: i,
				classList: el.className,
				parentHasHeading: !!parent?.querySelector?.('.kol-alert__heading'),
				textColorVar: cs.getPropertyValue('--text-color'),
				color: cs.color,
				rect: { x: rect.x, y: rect.y, w: rect.width, h: rect.height },
				iconClass: icon ? icon.className : null,
				iconColor: iconCs ? iconCs.color : null,
				iconOpacity: iconCs ? iconCs.opacity : null,
				visibility: cs.visibility,
				opacity: cs.opacity,
				display: cs.display,
				alignSelf: cs.alignSelf,
				minHeight: cs.minHeight,
				height: cs.height,
				boxSizing: cs.boxSizing,
				gridRowStart: cs.gridRowStart,
				gridRowEnd: cs.gridRowEnd,
				parentClass: parent ? parent.className : null,
				parentGridTemplateRows: parentCs ? parentCs.gridTemplateRows : null,
				parentDisplay: parentCs ? parentCs.display : null,
				parentRowGap: parentCs ? parentCs.rowGap : null,
				parentColumnGap: parentCs ? parentCs.columnGap : null,
			};
		});
	});

	console.log('PROBE_RESULT', JSON.stringify(result, null, 2));
});
