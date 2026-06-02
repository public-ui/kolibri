import type { KolFocusOptions, SelectOption } from '@public-ui/components';
import { KolButton, KolHeading, KolInputCheckbox, KolSelect } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { SampleDescription } from '../SampleDescription';

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

	const toggleOption = useCallback((key: keyof typeof focusOptions) => {
		setFocusOptions((prev) => ({
			...prev,
			[key]: !prev[key],
		}));
	}, []);

	const setSelectOption = useCallback((key: keyof typeof focusOptions, value: string) => {
		setFocusOptions((prev) => ({
			...prev,
			[key]: value,
		}));
	}, []);

	const behaviorOptions = useMemo<SelectOption<string>[]>(
		() => [
			{ label: 'Auto (instant)', value: 'auto' },
			{ label: 'Smooth (animated)', value: 'smooth' },
		],
		[],
	);

	const alignmentOptions = useMemo<SelectOption<string>[]>(
		() => [
			{ label: 'Start', value: 'start' },
			{ label: 'Center', value: 'center' },
			{ label: 'End', value: 'end' },
			{ label: 'Nearest', value: 'nearest' },
		],
		[],
	);

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
								onChange: () => toggleOption('preventScroll'),
							}}
						/>
						<KolInputCheckbox
							_label="Focus Visible (show focus ring)"
							_checked={focusOptions.focusVisible}
							_on={{
								onChange: () => toggleOption('focusVisible'),
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
						<div className="grid gap-2">
							<KolSelect
								_label="Behavior"
								_options={behaviorOptions}
								_value={focusOptions.behavior}
								_on={{
									onChange: (_event, v) => {
										setSelectOption('behavior', v as string);
									},
								}}
							/>
						</div>

						<div className="grid gap-2">
							<KolSelect
								_label="Block (vertical alignment)"
								_options={alignmentOptions}
								_value={focusOptions.block}
								_on={{
									onChange: (_event, v) => {
										setSelectOption('block', v as string);
									},
								}}
							/>
						</div>

						<div className="grid gap-2">
							<KolSelect
								_label="Inline (horizontal alignment)"
								_options={alignmentOptions}
								_value={focusOptions.inline}
								_on={{
									onChange: (_event, v) => {
										setSelectOption('inline', v as string);
									},
								}}
							/>
						</div>
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
				<div style={{ height: '100vh' }} />

				{/* Target Button */}
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Target (scroll to focus)" />
					<KolButton ref={targetRef} _label="I am the target element" _variant="primary" />
				</section>

				{/* More spacer */}
				<div style={{ height: '50vh' }} />

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
