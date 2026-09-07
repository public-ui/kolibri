import { useEffect, useState } from 'react';
import type { Entry } from './types';

export type Mode = 'side-by-side' | 'slider' | 'onion' | 'diff' | 'blink';
export const MODES: { id: Mode; label: string }[] = [
	{ id: 'side-by-side', label: 'Side by side' },
	{ id: 'slider', label: 'Slider' },
	{ id: 'onion', label: 'Onion skin' },
	{ id: 'diff', label: 'Diff' },
	{ id: 'blink', label: 'Blink' },
];

interface Props {
	entry: Entry;
	base: string;
	mode: Mode;
	zoom: number;
}

function Image({ src, alt, zoom }: { src: string; alt: string; zoom: number }) {
	return <img src={src} alt={alt} style={{ width: `${zoom * 100}%` }} className={zoom > 1 ? 'pixelated' : undefined} draggable={false} />;
}

export function Viewer({ entry, base, mode, zoom }: Props) {
	const { item } = entry;
	const expected = item.expected ? `${base}/${item.expected}` : null;
	const actual = item.actual ? `${base}/${item.actual}` : null;
	const diff = item.diff ? `${base}/${item.diff}` : null;
	const [position, setPosition] = useState(50);
	const [opacity, setOpacity] = useState(50);
	const [blink, setBlink] = useState(false);

	useEffect(() => {
		if (mode !== 'blink') return undefined;
		const timer = window.setInterval(() => setBlink((value) => !value), 600);
		return () => window.clearInterval(timer);
	}, [mode]);

	if (item.status === 'unchanged') {
		return <p className="viewer-note">This snapshot is identical to the baseline – nothing to review.</p>;
	}
	if (item.status === 'error') {
		return (
			<p className="viewer-note">
				The route of this snapshot failed before it could be captured: <code>{item.message}</code>
			</p>
		);
	}
	if (!expected || !actual) {
		const only = expected ?? actual;
		return (
			<figure className="viewer-single">
				<figcaption>{expected ? 'Baseline (removed in this pull request)' : 'New snapshot (no baseline yet)'}</figcaption>
				<Image src={only!} alt={`${item.name} – ${expected ? 'baseline' : 'actual'}`} zoom={zoom} />
			</figure>
		);
	}

	switch (mode) {
		case 'side-by-side':
			return (
				<div className="viewer-columns">
					<figure>
						<figcaption>Baseline</figcaption>
						<Image src={expected} alt={`${item.name} – baseline`} zoom={zoom} />
					</figure>
					<figure>
						<figcaption>Actual</figcaption>
						<Image src={actual} alt={`${item.name} – actual`} zoom={zoom} />
					</figure>
				</div>
			);
		case 'diff':
			return (
				<figure>
					<figcaption>Diff (differing pixels highlighted)</figcaption>
					{diff ? (
						<Image src={diff} alt={`${item.name} – diff`} zoom={zoom} />
					) : (
						<p className="viewer-note">Playwright attached no diff image for this item.</p>
					)}
				</figure>
			);
		case 'blink':
			return (
				<figure>
					<figcaption>{blink ? 'Actual' : 'Baseline'}</figcaption>
					<Image src={blink ? actual : expected} alt={`${item.name} – ${blink ? 'actual' : 'baseline'}`} zoom={zoom} />
				</figure>
			);
		case 'onion':
			return (
				<figure>
					<figcaption>
						<label>
							Actual opacity {opacity}%
							<input type="range" min={0} max={100} value={opacity} onChange={(event) => setOpacity(Number(event.target.value))} />
						</label>
					</figcaption>
					<div className="viewer-stack">
						<Image src={expected} alt={`${item.name} – baseline`} zoom={zoom} />
						<div className="viewer-overlay" style={{ opacity: opacity / 100 }}>
							<Image src={actual} alt={`${item.name} – actual`} zoom={zoom} />
						</div>
					</div>
				</figure>
			);
		case 'slider':
		default:
			return (
				<figure>
					<figcaption>
						<label>
							Reveal actual {position}%
							<input type="range" min={0} max={100} value={position} onChange={(event) => setPosition(Number(event.target.value))} />
						</label>
					</figcaption>
					<div className="viewer-stack">
						<Image src={expected} alt={`${item.name} – baseline`} zoom={zoom} />
						<div className="viewer-overlay" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
							<Image src={actual} alt={`${item.name} – actual`} zoom={zoom} />
						</div>
						<div className="viewer-slider-line" style={{ left: `${position}%` }} aria-hidden="true" />
					</div>
				</figure>
			);
	}
}
