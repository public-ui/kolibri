import { KolCombobox, KolInputText, KolSelect, KolTextarea } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import '../../@shared/demo-input-wc';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const InputTextAriaDetails: FC = () => (
	<>
		<SampleDescription>
			<p>
				Demonstrates how to use <code>_ariaDetails</code> to reference an external element that provides detailed information about form inputs. All inputs
				below reference the same details box via their <code>_ariaDetails</code> prop.
			</p>
			<p>
				The native inputs above are the control group: the first one declares a plain <code>aria-details</code> IDREF in the same tree, the second one is
				wrapped in a native web component whose shadow input bridges the reference via <code>ariaDetailsElements</code> — the same mechanism KoliBri uses. If a
				native case announces the details in a screen reader while the KoliBri fields do not, the gap is in KoliBri; if the native shadow case is silent too,
				the platform does not support the relation across the boundary yet (Safari/VoiceOver lacks element reflection — verify with NVDA or JAWS on Chromium
				instead).
			</p>
			<p>
				The last example below replicates the{' '}
				<a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-details">
					MDN example for <code>aria-details</code>
				</a>
				: a term references its definition and an explanatory link — the canonical use outside of forms the attribute was designed for.
			</p>
		</SampleDescription>

		<SampleBlock id="aria-details" className="grid gap-8">
			{/* Native reference implementations — the control group */}
			<div className="grid gap-4 p-4 border border-gray-300 rounded">
				<h2 className="text-lg font-semibold">Native reference implementations</h2>

				<div>
					<label className="block">
						<span className="block mb-2">Native HTML input (no web component)</span>
						<input aria-details="details-box-native-light" aria-label="Native light input" className="border border-gray-500 p-2" />
					</label>
					<div id="details-box-native-light" className="mt-2 p-2 bg-blue-50 border-l-4 border-blue-400 rounded text-sm text-blue-800">
						Details for the plain native input: the IDREF resolves in the same tree — no boundary to cross.
					</div>
				</div>

				<div>{React.createElement('demo-input-light', { 'aria-details': 'details-box-native-light' })}</div>

				<div>
					{React.createElement('demo-input-shadow', { 'aria-details': 'details-box-native-shadow' })}
					<div id="details-box-native-shadow" className="mt-2 p-2 bg-blue-50 border-l-4 border-blue-400 rounded text-sm text-blue-800">
						Details for the native shadow input: the reference crosses the boundary via <code>ariaDetailsElements</code> on the input.
					</div>
				</div>
			</div>

			{/* KoliBri form fields */}
			<div className="grid gap-4 p-4 border border-gray-300 rounded">
				<h2 className="text-lg font-semibold">Form Inputs with Shared Details</h2>

				<KolInputText _label="Email Address" _ariaDetails="details-box" _placeholder="user@example.com" _hint="We'll never share your email" />

				<KolSelect
					_label="Country"
					_ariaDetails="details-box"
					_options={[
						{ label: 'Germany', value: 'de' },
						{ label: 'Austria', value: 'at' },
						{ label: 'Switzerland', value: 'ch' },
					]}
				/>

				<KolTextarea _label="Message" _ariaDetails="details-box" _placeholder="Enter your message here..." _rows={4} />

				<KolCombobox _label="Favorite Language" _ariaDetails="details-box" _suggestions={['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'Java']} />
			</div>

			{/* Shared details box */}
			<div id="details-box" className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded" role="complementary">
				<h3 className="font-semibold text-blue-900 mb-2">💡 Form Details</h3>
				<ul className="text-sm text-blue-800 space-y-2">
					<li>
						<strong>Email:</strong> Please enter a valid email address. We use this to contact you about your submission.
					</li>
					<li>
						<strong>Country:</strong> Select your country of residence. This helps us provide localized support.
					</li>
					<li>
						<strong>Message:</strong> Provide as much detail as possible. The more information you give, the better we can assist you.
					</li>
					<li>
						<strong>Language:</strong> Choose your preferred programming language. This helps us recommend relevant resources.
					</li>
				</ul>
			</div>

			{/* MDN example — term & definition (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-details) */}
			<div className="grid gap-4 p-4 border border-gray-300 rounded">
				<h2 className="text-lg font-semibold">MDN example: term &amp; definition</h2>

				<p>
					The term below references two targets: the definition paragraph and the explanatory image link. Screen reader support for <code>aria-details</code> is
					heavily fragmented — check <a href="https://a11ysupport.io/tech/aria/aria-details_attribute">a11ysupport.io</a> before relying on it.
				</p>

				<p>
					The <strong>cubic-bezier()</strong> functional notation defines a cubic{' '}
					<span role="term" aria-details="bezier bezImg" className="underline decoration-dotted underline-offset-4">
						Bézier curve
					</span>
					. As these curves are continuous, they are often used to smooth down the start and end of the curve and are therefore sometimes called easing
					functions.
				</p>

				<p role="definition" id="bezier" className="p-2 bg-blue-50 border-l-4 border-blue-400 rounded text-sm text-blue-800">
					A <strong>Bézier curve</strong>, (Pronounced \ ˈbe-zē-ˌā \ <i aria-description="English pronunciation">BEH-zee-ay</i>) is a mathematically described
					curve used in computer graphics and animation. The curve is defined by a set of control points with a minimum of two. Web related graphics and
					animations use Cubic Béziers, which are curves with four control points P<sub>0</sub>, P<sub>1</sub>, P<sub>2</sub>, and P<sub>3</sub>.
				</p>

				<a
					href="https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function"
					id="bezImg"
					aria-label="Explanation of Bézier curve in CSS easing functions"
					target="_blank"
					rel="noreferrer"
					className="block w-fit"
				>
					<svg
						width="200"
						height="160"
						viewBox="0 0 200 160"
						role="img"
						aria-label="Cubic Bézier curve showing 4 control points."
						className="border border-gray-400 rounded bg-white"
					>
						<path d="M 20 130 C 60 10, 140 150, 180 30" fill="none" stroke="#0075ff" strokeWidth="2" />
						<line x1="20" y1="130" x2="60" y2="10" stroke="#888" strokeDasharray="4 3" />
						<line x1="140" y1="150" x2="180" y2="30" stroke="#888" strokeDasharray="4 3" />
						<circle cx="20" cy="130" r="4" fill="#0075ff" />
						<circle cx="60" cy="10" r="4" fill="#888" />
						<circle cx="140" cy="150" r="4" fill="#888" />
						<circle cx="180" cy="30" r="4" fill="#0075ff" />
						<text x="12" y="148" fontSize="12" fill="#202020">
							P0
						</text>
						<text x="60" y="24" fontSize="12" fill="#202020" textAnchor="middle">
							P1
						</text>
						<text x="140" y="144" fontSize="12" fill="#202020" textAnchor="middle">
							P2
						</text>
						<text x="184" y="20" fontSize="12" fill="#202020" textAnchor="end">
							P3
						</text>
					</svg>
				</a>
			</div>
		</SampleBlock>
	</>
);
