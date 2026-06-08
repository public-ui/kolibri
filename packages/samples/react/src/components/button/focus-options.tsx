import type { KolFocusOptions, SelectOption } from '@public-ui/components';
import { KolButton, KolHeading, KolSelect } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useCallback, useRef, useState } from 'react';
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

const SELECT_CONFIGS = [
	{ label: 'Behavior', key: 'behavior' as const, options: BEHAVIOR_OPTIONS },
	{ label: 'Block (vertical alignment)', key: 'block' as const, options: ALIGNMENT_OPTIONS },
	{ label: 'Inline (horizontal alignment)', key: 'inline' as const, options: ALIGNMENT_OPTIONS },
];

const SCROLL_CONTAINER_STYLE: React.CSSProperties = {
	padding: '1rem',
	marginTop: '1rem',
	border: '1px solid #ccc',
};

export const ButtonFocusOptions: FC = () => {
	const backToTopRef = useRef<HTMLKolButtonElement>(null);
	const behaviorSelectRef = useRef<HTMLKolSelectElement>(null);
	const [focusOptions, setFocusOptions] = useState<KolFocusOptions>({
		behavior: 'auto',
		block: 'start',
		inline: 'start',
	});
	const [afterFocusCalled, setAfterFocusCalled] = useState(false);

	const handleFocus = useCallback(async () => {
		if (backToTopRef.current) {
			setAfterFocusCalled(false);

			await backToTopRef.current.focus({
				...focusOptions,
				afterFocus: () => {
					setAfterFocusCalled(true);
				},
			});
		}
	}, [focusOptions]);

	const handleBackToTop = useCallback(async () => {
		if (behaviorSelectRef.current) {
			setAfterFocusCalled(false);

			await behaviorSelectRef.current.focus({
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
					below viewport) and horizontal scrolling (element positioned outside viewport). The focus options control how the element is scrolled into view, with
					the afterFocus callback triggering after scrolling completes.
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
						{SELECT_CONFIGS.map((config, index) => (
							<div key={config.key} className="grid gap-2">
								{/* eslint-disable @typescript-eslint/no-unsafe-member-access */}
								<KolSelect
									ref={index === 0 ? behaviorSelectRef : null}
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

				{/* Scroll Example */}
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Scroll Example" />
					<p>The target button is positioned bottom-right. Scroll down and right to find it, then click &quot;Focus Target&quot; to apply scroll behavior.</p>

					<div className="flex gap-4">
						<KolButton _label="Focus Target" _variant="primary" onClick={handleFocus} />
					</div>
					<p>
						Callback invoked: <strong>{afterFocusCalled ? 'Yes ✓' : 'No'}</strong>
					</p>

					<div
						style={{
							...SCROLL_CONTAINER_STYLE,
							overflow: 'auto',
							width: '500px',
							height: '600px',
						}}
					>
						<div
							style={{
								width: '2400px',
								height: '2400px',
								padding: '1rem',
								position: 'relative',
							}}
						>
							<div style={{ padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>Content area (scroll to find button)</div>
							<KolButton
								ref={backToTopRef}
								_label="Back to Top"
								_variant="primary"
								onClick={handleBackToTop}
								style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}
							/>
						</div>
					</div>
				</section>

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
