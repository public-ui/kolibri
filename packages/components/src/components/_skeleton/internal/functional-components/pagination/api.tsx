import type { BoundaryCountProp } from '../../schema/props/boundary-count';
import type { CustomClassProp } from '../../schema/props/custom-class';
import type { HasButtonsProp } from '../../schema/props/has-buttons';
import type { LabelProp } from '../../schema/props/label';
import type { MaxProp } from '../../schema/props/max';
import type { PageProp } from '../../schema/props/page';
import type { PageSizeProp } from '../../schema/props/page-size';
import type { PageSizeOptionsProp } from '../../schema/props/page-size-options';
import type { PaginationOnProp } from '../../schema/props/pagination-on';
import type { SiblingCountProp } from '../../schema/props/sibling-count';
import type { TooltipAlignProp } from '../../schema/props/tooltip-align';
import type { ComponentApi } from '../generic-types';

export interface PaginationApi extends ComponentApi {
	Props: {
		Required: MaxProp & PageProp & PaginationOnProp;
		Optional: BoundaryCountProp & CustomClassProp & HasButtonsProp & LabelProp & PageSizeProp & PageSizeOptionsProp & SiblingCountProp & TooltipAlignProp;
	};
	Callbacks: {
		changePageSize: (event: Event, value: unknown) => void;
		goBackward: (event: Event) => void;
		goForward: (event: Event) => void;
		goToEnd: (event: Event) => void;
		goToFirst: (event: Event) => void;
		selectPage: (event: Event, page: number) => void;
	};
}
