import { arrow, computePosition, flip, offset, shift } from '@floating-ui/dom';
import { processEnv } from '@public-ui/schema';

import type { AlignPropType } from '@public-ui/schema';
type Arguments = {
	floatingElement: HTMLElement;
	referenceElement: Element;
	arrowElement?: HTMLElement;
	align?: AlignPropType;
};
export const alignFloatingElements = async ({ floatingElement, referenceElement, arrowElement, align = 'top' }: Arguments) => {
	if (processEnv !== 'test') {
		const middleware = [offset(arrowElement?.offsetHeight ?? 10), flip(), shift()];
		if (arrowElement) {
			middleware.push(arrow({ element: arrowElement }));
		}

		const { x, y, middlewareData, placement } = await computePosition(referenceElement, floatingElement, {
			placement: align,
			middleware: middleware,
			strategy: 'fixed',
		});

		Object.assign(floatingElement.style, {
			left: `${x}px`,
			top: `${y}px`,
			visibility: 'visible',
		});

		if (arrowElement) {
			if (middlewareData.arrow?.x) {
				Object.assign(arrowElement.style, {
					left: `${middlewareData.arrow.x}px`,
					top: placement === 'bottom' ? `${-arrowElement.offsetHeight / 2}px` : '',
					bottom: placement === 'top' ? `${-arrowElement.offsetHeight / 2}px` : '',
				});
			} else if (middlewareData.arrow?.y) {
				Object.assign(arrowElement.style, {
					left: placement === 'right' ? `${-arrowElement.offsetWidth / 2}px` : '',
					right: placement === 'left' ? `${-arrowElement.offsetWidth / 2}px` : '',
					top: `${middlewareData.arrow.y}px`,
				});
			}
		}
	}
};
