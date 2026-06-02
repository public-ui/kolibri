import type { KolFocusOptions, SelectOption } from '@public-ui/components';
import { KolButton, KolHeading, KolInputCheckbox, KolSelect } from '@public-ui/react-v19';
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

const SPACER_FULL = 'calc(100vh - 2rem)';
const SPACER_HALF = 'calc(50vh - 1rem)';

const SELECT_CONFIGS = [
	{ label: 'Behavior', key: 'behavior' as const, options: BEHAVIOR_OPTIONS },
	{ label: 'Block (vertical alignment)', key: 'block' as const, options: ALIGNMENT_OPTIONS },
	{ label: 'Inline (horizontal alignment)', key: 'inline' as const, options: ALIGNMENT_OPTIONS },
];

export const ButtonFocusOptions: FC = () => {
	const targetRef = useRef<HTMLKolButtonElement>(null);
	const [focusOptions, setFocusOptions] = useState<KolFocusOptions>({
		preventScroll: false,
		focusVisible: false,
		behavior: 'auto',
		block: 'start',
		inline: 'nearest',
	});
	const [afterFocusCalled, setAfterFocusCalled] = useState(false);

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

	const toggleBooleanOption = useCallback((key: 'preventScroll' | 'focusVisible') => {
		setFocusOptions((prev) => ({
			...prev,
			[key]: !prev[key],
		}));
	}, []);

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
					This story demonstrates the KolFocusOptions for manual focus control. It showcases how to combine focus behavior with scroll-into-view options,
					including the afterFocus callback that triggers after scrolling is complete.
				</p>
			</SampleDescription>

			<div className="grid gap-8">
				{/* Controls */}
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Focus Options Configuration" />

					<div className="grid gap-4">
						<KolInputCheckbox
							_label="Prevent Scroll (manual scroll control)"
							_checked={focusOptions.preventScroll}
							_on={{
								onChange: () => toggleBooleanOption('preventScroll'),
							}}
						/>
						<KolInputCheckbox
							_label="Focus Visible (show focus ring)"
							_checked={focusOptions.focusVisible}
							_on={{
								onChange: () => toggleBooleanOption('focusVisible'),
							}}
						/>
					</div>
				</section>

				{/* Scroll Into View Options */}
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Scroll Into View Options" />
					<p>
						These options control how the element is scrolled into view. When <code>preventScroll: false</code> (default), the browser scrolls first, then focus
						is set. When <code>preventScroll: true</code>, the element is scrolled into view using these options after focus.
					</p>

					<div className="grid gap-4">
						{SELECT_CONFIGS.map((config) => (
							<div key={config.key} className="grid gap-2">
								<KolSelect
									_label={config.label}
									_options={config.options}
									_value={focusOptions[config.key]}
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

				{/* Action Buttons */}
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Action" />
					<div className="flex gap-4">
						<KolButton _label="Focus Target" _variant="primary" onClick={handleFocus} />
						<KolButton _label="Reset" _variant="secondary" onClick={() => setAfterFocusCalled(false)} />
					</div>
					<p>
						After focus callback called: <strong>{afterFocusCalled ? 'Yes ✓' : 'No'}</strong>
					</p>
				</section>

				<hr />

				{/* Target Element - positioned to require scrolling */}
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Target Element" />
					<p>Scroll down to see the target button, then click &quot;Focus Target&quot; to test different scroll behaviors.</p>
				</section>

				{/* Spacer to push target below viewport */}
				<div style={{ height: SPACER_FULL }} />

				{/* Target Button */}
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Target (scroll to focus)" />
					<KolButton ref={targetRef} _label="I am the target element" _variant="primary" />
				</section>

				{/* More spacer */}
				<div style={{ height: SPACER_HALF }} />

				{/* Description */}
				<section className="grid gap-4">
					<KolHeading _level={2} _label="About KolFocusOptions" />
					<div className="indented-text">
						<p>KolFocusOptions extends native focus options with scroll control:</p>
						<ul className="list-disc pl-5">
							<li>
								<strong>preventScroll:</strong> When true, prevents browser auto-scroll; use scroll options for manual control
							</li>
							<li>
								<strong>focusVisible:</strong> When true, ensures focus ring is visible
							</li>
							<li>
								<strong>behavior:</strong> &quot;auto&quot; (instant) or &quot;smooth&quot; (animated) scroll
							</li>
							<li>
								<strong>block:</strong> Vertical alignment - start, center, end, or nearest
							</li>
							<li>
								<strong>inline:</strong> Horizontal alignment - start, center, end, or nearest
							</li>
							<li>
								<strong>afterFocus:</strong> Callback invoked after focus AND scroll are complete
							</li>
						</ul>
					</div>
				</section>
			</div>
		</>
	);
};
