import { translate } from '../../../../../i18n';
import type { KoliBriPaginationButtonCallbacks, Option, PaginationHasButton, Stringified, TooltipAlignPropType } from '../../../../../schema';
import { parseJson, STATE_CHANGE_EVENT } from '../../../../../schema';
import { nonce } from '../../../../../utils/dev.utils';
import { KolEvent } from '../../../../../utils/events';
import { addNavLabel, removeNavLabel } from '../../../../../utils/unique-nav-labels';
import { boundaryCountProp, type BoundaryCountPropType } from '../../schema/props/boundary-count';
import { customClassProp, type CustomClassPropType } from '../../schema/props/custom-class';
import { hasButtonsProp } from '../../schema/props/has-buttons';
import { labelProp, type LabelPropType } from '../../schema/props/label';
import { maxProp, type MaxPropType } from '../../schema/props/max';
import { pageProp, type PagePropType } from '../../schema/props/page';
import { pageSizeProp, type PageSizePropType } from '../../schema/props/page-size';
import { paginationOnProp } from '../../schema/props/pagination-on';
import { siblingCountProp, type SiblingCountPropType } from '../../schema/props/sibling-count';
import { tooltipAlignProp } from '../../schema/props/tooltip-align';
import { BaseController } from '../base-controller';
import type { ResolvedProps } from '../generic-types';
import type { PaginationApi } from './api';

export type PaginationControllerDependencies = {
	dispatchEvent: (type: KolEvent, value: number) => void;
	setPageSize: (value: number) => void;
};

type PaginationControllerProps = {
	boundaryCount?: BoundaryCountPropType;
	customClass?: CustomClassPropType;
	hasButtons?: boolean | Stringified<PaginationHasButton>;
	label?: LabelPropType;
	max?: MaxPropType;
	on?: KoliBriPaginationButtonCallbacks;
	page?: PagePropType;
	pageSize?: PageSizePropType;
	pageSizeOptions?: Stringified<number[]>;
	siblingCount?: SiblingCountPropType;
	tooltipAlign?: TooltipAlignPropType;
};

const defaultPaginationLabel = translate('kol-pagination');

export class PaginationController extends BaseController<ResolvedProps<PaginationApi>, PaginationApi['States']> {
	private readonly dispatchEvent: (type: KolEvent, value: number) => void;
	private readonly setPageSize: (value: number) => void;
	private readonly translatePagination = defaultPaginationLabel;
	public readonly translateEntriesPerSite = translate('kol-entries-per-site');
	public readonly translatePage = translate('kol-page');
	public readonly translatePageBack = translate('kol-page-back');
	public readonly translatePageFirst = translate('kol-page-first');
	public readonly translatePageLast = translate('kol-page-last');
	public readonly translatePageNext = translate('kol-page-next');
	public readonly instanceId = nonce();

	public constructor({ dispatchEvent, setPageSize }: PaginationControllerDependencies) {
		super({} as PaginationApi['States'], {
			boundaryCount: 1,
			customClass: undefined,
			hasButtons: {
				first: true,
				last: true,
				next: true,
				previous: true,
			},
			label: defaultPaginationLabel,
			max: 0,
			on: {
				onClick: () => null,
			},
			page: 0,
			pageSize: 1,
			pageSizeOptions: [],
			siblingCount: 1,
			tooltipAlign: 'top',
		});
		this.dispatchEvent = dispatchEvent;
		this.setPageSize = setPageSize;
	}

	public componentWillLoad(props: PaginationControllerProps): void {
		this.watchBoundaryCount(props.boundaryCount);
		this.watchCustomClass(props.customClass);
		this.watchHasButtons(props.hasButtons);
		this.watchLabel(props.label, true);
		this.watchOn(props.on);
		this.watchPage(props.page);
		this.watchPageSize(props.pageSize);
		this.watchPageSizeOptions(props.pageSizeOptions);
		this.watchSiblingCount(props.siblingCount);
		this.watchTooltipAlign(props.tooltipAlign);
		this.watchMax(props.max);
		this.watchPage(props.page);
	}

	public getRenderProps(): ResolvedProps<PaginationApi> {
		return this.getProps();
	}

	public watchBoundaryCount(value?: BoundaryCountPropType): void {
		const normalized = boundaryCountProp.normalize(value);
		if (boundaryCountProp.validate(normalized)) {
			this.setProp('boundaryCount', Math.max(0, normalized));
		} else if (value === undefined) {
			this.setProp('boundaryCount', 1);
		}
	}

	public watchCustomClass(value?: CustomClassPropType): void {
		if (value === undefined) {
			this.setProp('customClass', undefined);
			return;
		}
		const normalized = customClassProp.normalize(value);
		if (customClassProp.validate(normalized)) {
			this.setProp('customClass', normalized);
		}
	}

	public watchHasButtons(value?: boolean | Stringified<PaginationHasButton>): void {
		const resolved = this.resolveHasButtons(value);
		if (hasButtonsProp.validate(resolved)) {
			this.setProp('hasButtons', resolved);
		}
	}

	public watchLabel(value?: LabelPropType, initial = false): void {
		const normalized = labelProp.normalize(value);
		const nextLabel = labelProp.validate(normalized) ? normalized : this.getProps().label;
		if (!initial) {
			removeNavLabel(this.getProps().label);
		}
		this.setProp('label', nextLabel ?? this.translatePagination);
		addNavLabel(this.getProps().label);
	}

	public watchOn(value?: KoliBriPaginationButtonCallbacks): void {
		const normalized = paginationOnProp.normalize(value);
		if (paginationOnProp.validate(normalized)) {
			this.setProp('on', normalized);
		}
	}

	public watchPage(value?: PagePropType): void {
		const normalized = pageProp.normalize(value);
		if (pageProp.validate(normalized)) {
			const nextPage = this.syncPage(normalized, this.getProps().pageSize, this.getProps().max);
			this.setProp('page', nextPage);
		}
	}

	public watchPageSize(value?: PageSizePropType): void {
		const normalized = pageSizeProp.normalize(value);
		if (pageSizeProp.validate(normalized)) {
			const nextPageSize = this.resolvePageSize(normalized, this.getProps().pageSizeOptions);
			this.setProp('pageSize', nextPageSize);
			const nextPage = this.syncPage(this.getProps().page, nextPageSize, this.getProps().max);
			this.setProp('page', nextPage);
		}
	}

	public watchPageSizeOptions(value?: Stringified<number[]>): void {
		const normalized = this.normalizePageSizeOptions(value);
		if (!normalized) {
			return;
		}
		this.setProp('pageSizeOptions', normalized);
		const nextPageSize = this.resolvePageSize(this.getProps().pageSize, normalized);
		this.setProp('pageSize', nextPageSize);
		const nextPage = this.syncPage(this.getProps().page, nextPageSize, this.getProps().max);
		this.setProp('page', nextPage);
	}

	public watchSiblingCount(value?: SiblingCountPropType): void {
		const normalized = siblingCountProp.normalize(value);
		if (siblingCountProp.validate(normalized)) {
			this.setProp('siblingCount', Math.max(0, normalized));
		} else if (value === undefined) {
			this.setProp('siblingCount', 1);
		}
	}

	public watchTooltipAlign(value?: TooltipAlignPropType): void {
		const normalized = tooltipAlignProp.normalize(value);
		if (tooltipAlignProp.validate(normalized)) {
			this.setProp('tooltipAlign', normalized);
		} else if (value === undefined) {
			this.setProp('tooltipAlign', 'top');
		}
	}

	public watchMax(value?: MaxPropType): void {
		const normalized = maxProp.normalize(value);
		if (maxProp.validate(normalized)) {
			this.setProp('max', normalized);
			const nextPage = this.syncPage(this.getProps().page, this.getProps().pageSize, normalized);
			this.setProp('page', nextPage);
		}
	}

	public handleGoToFirst = (event: Event): void => {
		this.handleSelectPage(event, 1);
	};

	public handleGoToEnd = (event: Event): void => {
		this.handleSelectPage(event, this.getCount());
	};

	public handleGoBackward = (event: Event): void => {
		this.handleSelectPage(event, this.getProps().page - 1);
	};

	public handleGoForward = (event: Event): void => {
		this.handleSelectPage(event, this.getProps().page + 1);
	};

	public handleSelectPage = (event: Event, page: number): void => {
		const { on } = this.getProps();
		if (typeof on.onClick === 'function') {
			on.onClick(event, page);
		}
		this.dispatchEvent(KolEvent.click, page);
		this.handleChangePage(event, page);
	};

	public handleChangePage = (event: Event, page: number): void => {
		const { on } = this.getProps();
		const timeout = setTimeout(() => {
			clearTimeout(timeout);
			if (typeof on.onChangePage === 'function') {
				on.onChangePage(event, page);
			}
			this.dispatchEvent(KolEvent.changePage, page);
		});
	};

	public handleChangePageSize = (event: Event, value: unknown): void => {
		const parsedValue = parseInt(value as string, 10);
		if (typeof parsedValue === 'number' && parsedValue > 0 && this.getProps().pageSize !== parsedValue) {
			this.setPageSize(parsedValue);
			const { on } = this.getProps();
			const timeout = setTimeout(() => {
				clearTimeout(timeout);
				if (typeof on.onChangePageSize === 'function') {
					on.onChangePageSize(event, parsedValue);
				}
				this.dispatchEvent(KolEvent.changePageSize, parsedValue);
			});
		}
	};

	public disconnect(): void {
		removeNavLabel(this.getProps().label);
	}

	private resolveHasButtons(value?: boolean | Stringified<PaginationHasButton>): PaginationHasButton {
		if (typeof value === 'boolean') {
			return {
				first: value,
				last: value,
				next: value,
				previous: value,
			};
		}

		let nextValue = value;
		if (typeof nextValue === 'string') {
			try {
				nextValue = parseJson<PaginationHasButton>(nextValue);
			} catch {
				return this.getProps().hasButtons;
			}
		}

		if (typeof nextValue === 'object' && nextValue !== null) {
			const current = this.getProps().hasButtons;
			return {
				first: typeof nextValue.first === 'boolean' ? nextValue.first : current.first,
				last: typeof nextValue.last === 'boolean' ? nextValue.last : current.last,
				next: typeof nextValue.next === 'boolean' ? nextValue.next : current.next,
				previous: typeof nextValue.previous === 'boolean' ? nextValue.previous : current.previous,
			};
		}

		return this.getProps().hasButtons;
	}

	private normalizePageSizeOptions(value?: Stringified<number[]>): Option<number>[] | null {
		let nextValue = value;
		if (typeof nextValue === 'string') {
			try {
				nextValue = parseJson<number[]>(nextValue);
			} catch {
				return null;
			}
		}

		if (typeof nextValue === 'undefined') {
			return [];
		}

		if (!Array.isArray(nextValue)) {
			return null;
		}

		if (nextValue.every((entry) => typeof entry === 'object' && entry !== null && 'label' in entry && 'value' in entry)) {
			return nextValue as Option<number>[];
		}

		const options: Option<number>[] = [];
		for (const entry of nextValue) {
			if (typeof entry !== 'number') {
				return null;
			}
			options.push({
				label: `${entry}`,
				value: entry,
			});
		}

		return options;
	}

	private resolvePageSize(pageSize: number, options: Option<number>[]): number {
		if (options.length === 0) {
			return pageSize;
		}
		const match = options.find((option) => option.value === pageSize);
		return match ? match.value : options[0].value;
	}

	private syncPage(page: number, pageSize: number, total: number): number {
		if (total > 0) {
			const count = this.calcCount(total, pageSize);
			if (count > 0) {
				if (page > count) {
					this.handleChangePage(STATE_CHANGE_EVENT, count);
					return count;
				}
				if (page < 1) {
					this.handleChangePage(STATE_CHANGE_EVENT, 1);
					return 1;
				}
			}
		}
		return page;
	}

	private calcCount(total: number, pageSize = 1): number {
		return Math.ceil(total / pageSize);
	}

	private getCount(): number {
		return this.calcCount(this.getProps().max, this.getProps().pageSize);
	}
}
