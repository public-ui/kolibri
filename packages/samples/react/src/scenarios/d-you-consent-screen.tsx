import { KolButton, KolHeading, KolIcon, KolInputCheckbox, KolLink } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useState } from 'react';
import { SampleDescription } from '../components/SampleDescription';

/*
 * The consent screen of the d-you design system, assembled from KoliBri components.
 *
 * It is a layout pattern rather than a component sample: a fixed top app bar, a content area on the
 * 16px side gutter, and a sticky action bar whose primary action stays disabled until the consent is
 * given. Every measurement comes from the d-you styleguide
 * (`packages/themes/d-you/STYLEGUIDE.md`, §3): 16px content padding, 8px between related items,
 * 24px between sections, 16px top and sides plus 32px bottom for the action bar.
 */

/*
 * KoliBri sizes everything against `--kolibri-root-font-size` rather than against the document's own
 * root size, which the sample app sets to 100px. A plain `rem` here would therefore be six times too
 * large, and a plain `px` would stop the layout scaling with the user's font-size preference — which
 * is exactly what the design system's "content scaling" rule asks for. This mirrors the `rem()`
 * function the SCSS side of this package uses.
 */
const rem = (px: number) => `calc(${px} * 1rem / var(--kolibri-root-font-size, 16))`;

/*
 * Stated literally because KoliBri's design tokens live on the `:host` of each component and cannot
 * be read from the page around them. `#f4f4f4` is the design system's `surface-container`.
 */
const SURFACE_CONTAINER = '#f4f4f4';

const SUMMARY_POINTS = [
	'Deine Daten sind sicher auf deinem Gerät verschlüsselt gespeichert',
	'Du kannst deine Daten jederzeit löschen',
	'Du entscheidest, mit wem du deine Daten teilst',
];

export const DYouConsentScreen: FC = () => {
	const [consented, setConsented] = useState(false);

	return (
		<>
			<SampleDescription>
				<p>
					The consent screen of the <strong>d-you</strong> design system, built from KoliBri components. It shows the three pieces the system prescribes for a
					step in a flow: a top app bar, the content area on the 16px gutter, and a sticky action bar.
				</p>
				<p>
					The primary action stays disabled until the checkbox is ticked — the screen this pattern comes from shows exactly that state. Switch the theme to{' '}
					<strong>d-you (Demo)</strong> to see it as designed.
				</p>
				<p>
					Two details differ from the design file. The help and info glyphs come from the KoliBri icon set, because the IBM Carbon icons the design system
					specifies are not packaged in this repository. And KoliBri renders a checkbox label as plain text, so the link to the terms sits below the sentence
					rather than inside it.
				</p>
			</SampleDescription>

			<div
				className="flex flex-col"
				style={{
					border: `1px solid ${SURFACE_CONTAINER}`,
					borderRadius: rem(24),
					maxWidth: rem(360),
					minHeight: rem(720),
				}}
			>
				{/* Top app bar: back and help, minimum 48px tall. */}
				<div className="flex items-center justify-between" style={{ padding: `${rem(4)} ${rem(16)}` }}>
					<KolButton _hideLabel _icons="kolicon-chevron-left" _label="Zurück" _variant="ghost" _on={{ onClick: () => {} }} />
					<KolButton _hideLabel _icons="kolicon-alert-info" _label="Hilfe" _variant="ghost" _on={{ onClick: () => {} }} />
				</div>

				<div className="flex flex-col" style={{ gap: rem(24), padding: `${rem(24)} ${rem(16)} 0` }}>
					<KolHeading _label="So schützt die App deine Daten" _level={1} />

					<p style={{ margin: 0 }}>Nutzungsbedingung und Datenschutzerklärung kurz zusammengefasst:</p>

					{/* The summary box: the neutral surface of the system, on the 16px card radius. */}
					<ul
						className="flex flex-col"
						style={{
							backgroundColor: SURFACE_CONTAINER,
							borderRadius: rem(16),
							gap: rem(16),
							listStyle: 'none',
							margin: 0,
							padding: `${rem(24)} ${rem(16)}`,
						}}
					>
						{SUMMARY_POINTS.map((point) => (
							<li className="flex items-start" key={point} style={{ gap: rem(8) }}>
								<KolIcon _icons="kolicon-check" _label="" />
								<span>{point}</span>
							</li>
						))}
					</ul>

					<div className="flex justify-center">
						<KolButton _icons="kolicon-alert-info" _label="Datenschutzerklärung lesen" _variant="ghost" _on={{ onClick: () => {} }} />
					</div>
				</div>

				{/* The system pushes the consent and the action to the bottom edge rather than spacing them. */}
				<div style={{ flexGrow: 1, minHeight: rem(32) }} />

				<div className="flex flex-col" style={{ gap: rem(16), padding: `${rem(16)} ${rem(16)} ${rem(32)}` }}>
					<KolInputCheckbox
						_checked={consented}
						_label="Ich willige den Nutzungsbedingungen ein."
						_on={{ onChange: (_event, value) => setConsented(Boolean(value)) }}
					/>
					<KolLink _href="#/scenarios/d-you-consent-screen" _label="Nutzungsbedingungen lesen" />
					<KolButton _disabled={!consented} _icons={{ right: 'kolicon-chevron-right' }} _label="Weiter" _variant="primary" _on={{ onClick: () => {} }} />
				</div>
			</div>
		</>
	);
};
