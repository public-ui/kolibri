import type { KolFocusOptions, KoliBriTableCell, SelectOption } from '@public-ui/components';
import { createReactRenderElement, KolButton, KolHeading, KolSelect, KolTableStateless } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useCallback, useRef, useState } from 'react';
import { getRoot } from '../../shares/react-roots';
import { SampleDescription } from '../SampleDescription';

const BEHAVIOR_OPTIONS: SelectOption<string>[] = [
	{ label: 'Auto (instant)', value: 'auto' },
	{ label: 'Smooth (animated)', value: 'smooth' },
];

const ALIGNMENT_OPTIONS: SelectOption<string>[] = [
	{ label: 'Start', value: 'start' },
	{ label: 'Center', value: 'center' },
	{ label: 'End', value: 'end' },
	{ label: 'Nearest', value: 'nearest' },
];

const SPACER_FULL = 'calc(100vh - 2rem)';
const SPACER_HALF = 'calc(50vh - 1rem)';

const SELECT_CONFIGS = [
	{ label: 'Behavior', key: 'behavior' as const, options: BEHAVIOR_OPTIONS },
	{ label: 'Block (vertical alignment)', key: 'block' as const, options: ALIGNMENT_OPTIONS },
	{ label: 'Inline (horizontal alignment)', key: 'inline' as const, options: ALIGNMENT_OPTIONS },
];

const TABLE_DATA = [
	{ id: 1, name: 'Alice Johnson', department: 'Engineering', status: 'Active' },
	{ id: 2, name: 'Bob Smith', department: 'Sales', status: 'Active' },
	{ id: 3, name: 'Carol White', department: 'Marketing', status: 'Inactive' },
	{ id: 4, name: 'David Brown', department: 'Engineering', status: 'Active' },
	{ id: 5, name: 'Eva Garcia', department: 'HR', status: 'Active' },
];

export const ButtonFocusOptions: FC = () => {
	const targetRef = useRef<HTMLKolButtonElement>(null);
	const tableActionRef = useRef<HTMLKolButtonElement>(null);
	const [focusOptions, setFocusOptions] = useState<KolFocusOptions>({
		behavior: 'smooth',
		block: 'start',
		inline: 'nearest',
	});
	const [afterFocusCalled, setAfterFocusCalled] = useState(false);
	const [activeTab, setActiveTab] = useState<'vertical' | 'horizontal'>('vertical');

	const handleFocus = useCallback(async () => {
		if (targetRef.current) {
			setAfterFocusCalled(false);

			await targetRef.current.focus({
				...focusOptions,
				afterFocus: () => {
					setAfterFocusCalled(true);
				},
			});
		}
	}, [focusOptions]);

	const handleTableFocus = useCallback(async () => {
		if (tableActionRef.current) {
			setAfterFocusCalled(false);

			await tableActionRef.current.focus({
				...focusOptions,
				afterFocus: () => {
					setAfterFocusCalled(true);
				},
			});
		}
	}, [focusOptions]);

	const setSelectOption = useCallback((key: 'behavior' | 'block' | 'inline', value: string) => {
		setFocusOptions((prev) => ({
			...prev,
			[key]: value,
		}));
	}, []);

	return (
		<>
			<SampleDescription>
				<p>
					This story demonstrates KolFocusOptions for manual focus control with scroll-into-view behavior. It showcases vertical scrolling (element positioned
					below viewport) and horizontal scrolling (action button in wide table). The focus options control how the element is scrolled into view, with the
					afterFocus callback triggering after scrolling completes.
				</p>
			</SampleDescription>

			<div className="grid gap-8">
				{/* Scroll Into View Options */}
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Scroll Behavior Options" />
					<p>
						These options control how elements are scrolled into view. <code>preventScroll</code> and <code>focusVisible</code> are always enabled for optimal
						focus management. Customize the scroll behavior and alignment below:
					</p>

					<div className="grid gap-4">
						{SELECT_CONFIGS.map((config) => (
							<div key={config.key} className="grid gap-2">
								{/* eslint-disable @typescript-eslint/no-unsafe-member-access */}
								<KolSelect
									_label={config.label}
									_options={config.options}
									_value={focusOptions[config.key as keyof KolFocusOptions]}
									_on={{
										onChange: (_event, v) => {
											setSelectOption(config.key, v as string);
										},
									}}
								/>
							</div>
						))}
					</div>
				</section>

				{/* Tab Selection */}
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Scroll Examples" />
					<div className="flex gap-2">
						<KolButton _label="Vertical Scroll" _variant={activeTab === 'vertical' ? 'primary' : 'secondary'} onClick={() => setActiveTab('vertical')} />
						<KolButton _label="Horizontal Scroll" _variant={activeTab === 'horizontal' ? 'primary' : 'secondary'} onClick={() => setActiveTab('horizontal')} />
					</div>
				</section>

				{/* Vertical Scroll Example */}
				{activeTab === 'vertical' && (
					<section className="grid gap-4">
						<KolHeading _level={3} _label="Vertical Scroll Example" />
						<p>Scroll down to see the target button below the spacer. Click &quot;Focus Target&quot; to apply scroll behavior.</p>

						<div className="flex gap-4">
							<KolButton _label="Focus Target" _variant="primary" onClick={handleFocus} />
							<KolButton _label="Reset" _variant="secondary" onClick={() => setAfterFocusCalled(false)} />
						</div>
						<p>
							Callback invoked: <strong>{afterFocusCalled ? 'Yes ✓' : 'No'}</strong>
						</p>

						<div style={{ height: SPACER_FULL }} />

						<KolButton ref={targetRef} _label="Vertical Target (scroll here)" _variant="primary" />

						<div style={{ height: SPACER_HALF }} />
					</section>
				)}

				{/* Horizontal Scroll Example */}
				{activeTab === 'horizontal' && (
					<section className="grid gap-4">
						<KolHeading _level={3} _label="Horizontal Scroll Example" />
						<p>The action button is in the rightmost column. Click &quot;Focus Action&quot; to focus it and apply scroll behavior.</p>

						<div className="flex gap-4">
							<KolButton _label="Focus Action" _variant="primary" onClick={handleTableFocus} />
							<KolButton _label="Reset" _variant="secondary" onClick={() => setAfterFocusCalled(false)} />
						</div>
						<p>
							Callback invoked: <strong>{afterFocusCalled ? 'Yes ✓' : 'No'}</strong>
						</p>

						<div style={{ overflowX: 'auto', marginTop: '1rem' }}>
							<KolTableStateless
								_label="Employee Table"
								_headerCells={{
									horizontal: [
										[
											{ key: 'id', label: 'ID' },
											{ key: 'name', label: 'Name' },
											{ key: 'department', label: 'Department' },
											{ key: 'status', label: 'Status' },
											{
												key: 'action',
												label: 'Action',
												render: (element: HTMLElement, cell: KoliBriTableCell) => {
													const row = cell as unknown as (typeof TABLE_DATA)[0];
													const isTarget = row?.id === 5;
													getRoot(createReactRenderElement(element)).render(
														<KolButton ref={isTarget ? tableActionRef : null} _label="Edit" _variant="secondary" _icon-only={false} />,
													);
												},
											},
										],
									],
								}}
								_data={TABLE_DATA.map((row) => ({
									id: row.id,
									name: row.name,
									department: row.department,
									status: row.status,
								}))}
								className="block"
								style={{ fontSize: '0.875rem' }}
							/>
						</div>
					</section>
				)}

				<hr />

				{/* Description */}
				<section className="grid gap-4">
					<KolHeading _level={2} _label="About KolFocusOptions" />
					<div className="indented-text">
						<p>KolFocusOptions enables advanced focus control with scroll-into-view behavior:</p>
						<ul className="list-disc pl-5">
							<li>
								<strong>preventScroll:</strong> Always enabled — prevents browser auto-scroll and uses custom scroll options instead
							</li>
							<li>
								<strong>focusVisible:</strong> Always enabled — ensures the focus ring is visible after focus
							</li>
							<li>
								<strong>behavior:</strong> &quot;auto&quot; (instant) or &quot;smooth&quot; (animated) scroll
							</li>
							<li>
								<strong>block:</strong> Vertical alignment (start, center, end, nearest)
							</li>
							<li>
								<strong>inline:</strong> Horizontal alignment (start, center, end, nearest)
							</li>
							<li>
								<strong>afterFocus:</strong> Optional callback invoked after focus and scroll complete
							</li>
						</ul>
					</div>
				</section>
			</div>
		</>
	);
};
