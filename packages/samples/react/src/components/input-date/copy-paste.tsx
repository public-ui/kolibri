import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { KolButton, KolInputDate } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';
import type { Iso8601 } from '@public-ui/components/src';

/** -----------------------------
 * Types & helpers
 * ----------------------------- */
const pad2 = (n: number): string => String(n).padStart(2, '0');

const isValidYmd = (y: number, m: number, d: number): boolean => {
	const dt = new Date(y, m - 1, d);
	return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;
};

type DateParts = { y: number; m: number; d: number };
type Extractor = (m: RegExpExecArray) => DateParts;

const PATTERNS: ReadonlyArray<{ re: RegExp; take: Extractor }> = [
	{ re: /^\s*(\d{4})-(\d{2})-(\d{2})\s*$/, take: (m) => ({ y: +m[1], m: +m[2], d: +m[3] }) }, // ISO
	{ re: /^\s*(\d{1,2})\.(\d{1,2})\.(\d{4})\s*$/, take: (m) => ({ y: +m[3], m: +m[2], d: +m[1] }) }, // DE
	{ re: /^\s*(\d{1,2})\/(\d{1,2})\/(\d{4})\s*$/, take: (m) => ({ y: +m[3], m: +m[1], d: +m[2] }) }, // US
];

/** Returns an Iso8601 (branded string) after validation */
function parseDateToIso(input: string): Iso8601 | null {
	for (const { re, take } of PATTERNS) {
		const m = re.exec(input);
		if (!m) continue;
		const { y, m: mo, d } = take(m);
		if (!isValidYmd(y, mo, d)) return null;
		return `${y}-${pad2(mo)}-${pad2(d)}` as Iso8601;
	}
	return null;
}

/** -----------------------------
 * Typed Web Component bridge
 * ----------------------------- */
type SetIsoValueMethod = (iso: Iso8601 | null) => Promise<void>;

type KolInputDateHost = HTMLKolInputDateElement & {
	setIsoValue?: SetIsoValueMethod;
	value?: string;
	_value?: Iso8601 | Date | null;
};

function isKolHost(n: EventTarget): n is KolInputDateHost {
	return n instanceof HTMLElement && n.tagName === 'KOL-INPUT-DATE';
}

async function setKolInputDateValue(host: KolInputDateHost, iso: Iso8601): Promise<void> {
	if (typeof host.setIsoValue === 'function') {
		await host.setIsoValue(iso);
	} else if (typeof host.value !== 'undefined') {
		host.value = iso;
	} else if (typeof host._value !== 'undefined') {
		host._value = iso;
	} else {
		host.setAttribute('_value', iso);
	}

	host.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
	host.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
}

/** -----------------------------
 * Composant React
 * ----------------------------- */
export const InputDateCopyPaste: React.FC = () => {
	const [deValue, setDeValue] = useState<string>('31.12.2025');
	const [usValue, setUsValue] = useState<string>('12/31/2025');
	const [status, setStatus] = useState<string>('');
	const activeKolHostRef = useRef<KolInputDateHost | null>(null);

	const isoFromDe = useMemo(() => parseDateToIso(deValue), [deValue]);
	const isoFromUs = useMemo(() => parseDateToIso(usValue), [usValue]);

	const deInputId = useId();
	const usInputId = useId();

	// Focus tracking (shadow DOM friendly via composedPath)
	useEffect(() => {
		const ac = new AbortController();

		const onFocusIn = (e: Event): void => {
			const path = (e.composedPath?.() ?? []) as EventTarget[];
			activeKolHostRef.current = path.find(isKolHost) ?? null;
		};

		document.addEventListener('focusin', onFocusIn, { capture: true, signal: ac.signal });
		return () => ac.abort();
	}, []);

	// Paste → normalize to ISO, then inject into the targeted KolInputDate
	useEffect(() => {
		const ac = new AbortController();

		const onPaste = (e: ClipboardEvent): void => {
			const host = activeKolHostRef.current;
			if (!host) return;

			const raw = e.clipboardData?.getData('text') ?? '';
			const iso = parseDateToIso(raw);

			if (!iso) {
				setStatus('Clipboard: unrecognized date format');
				return;
			}

			e.preventDefault();
			void setKolInputDateValue(host, iso);
			setStatus(`Pasted → ${iso}`);
		};

		document.addEventListener('paste', onPaste, { capture: true, signal: ac.signal });
		return () => ac.abort();
	}, []);

	const copyToClipboard = useCallback(async (text: Iso8601 | null): Promise<void> => {
		setStatus('');
		if (!text) return;
		try {
			await navigator.clipboard.writeText(text);
			setStatus(`Copied: ${text}`);
		} catch {
			setStatus('Copy failed. Your browser may block clipboard access.');
		}
	}, []);

	return (
		<>
			<SampleDescription>
				<p>
					Copy a date, then paste with <kbd>Ctrl</kbd>+<kbd>V</kbd> into the field below. It’s auto-converted to ISO (<code>YYYY-MM-DD</code>).
				</p>
				<p lang="de">
					DE: Datum (TT.MM.JJJJ) kopieren und mit <kbd>Strg</kbd>+<kbd>V</kbd> unten einfügen.
				</p>
			</SampleDescription>

			<div className="grid gap-8">
				{/* DE */}
				<section lang="de-DE" aria-labelledby="de-title">
					<h3 id="de-title" className="text-lg font-semibold mb-2">
						Deutsch (TT.MM.JJJJ)
					</h3>
					<div className="grid gap-3">
						<label className="block" htmlFor={deInputId}>
							<span className="block mb-1">Datum (deutsches Format: TT.MM.JJJJ)</span>
							<input
								id={deInputId}
								type="text"
								inputMode="numeric"
								placeholder="z. B. 31.12.2025"
								className="w-full p-2 border rounded"
								value={deValue}
								onInput={(e) => setDeValue((e.target as HTMLInputElement).value)}
								aria-describedby="de-help"
							/>
						</label>
						<small id="de-help" className="opacity-80">
							Beispiel eingeben und auf Kopieren klicken. Danach im Feld unten mit <kbd>Strg</kbd>+<kbd>V</kbd> einfügen.
						</small>

						<div className="flex items-center gap-2">
							<KolButton _label="In Zwischenablage kopieren (ISO)" _disabled={!isoFromDe} _on={{ onClick: () => copyToClipboard(isoFromDe) }} />
							{isoFromDe ? <code className="opacity-70">→ {isoFromDe}</code> : <span className="text-red-600">Ungültiges Datum</span>}
						</div>

						<KolInputDate _type="date" _label="Date (hier mit Strg+V einfügen)" className="w-full" />
					</div>
				</section>

				{/* US */}
				<section lang="en-US" aria-labelledby="us-title">
					<h3 id="us-title" className="text-lg font-semibold mb-2">
						US/English (MM/DD/YYYY)
					</h3>
					<div className="grid gap-3">
						<label className="block" htmlFor={usInputId}>
							<span className="block mb-1">Date (US format: MM/DD/YYYY)</span>
							<input
								id={usInputId}
								type="text"
								inputMode="numeric"
								placeholder="e.g., 12/31/2025"
								className="w-full p-2 border rounded"
								value={usValue}
								onInput={(e) => setUsValue((e.target as HTMLInputElement).value)}
								aria-describedby="us-help"
							/>
						</label>
						<small id="us-help" className="opacity-80">
							Type a date, click Copy, then paste below with <kbd>Ctrl</kbd>+<kbd>V</kbd>.
						</small>

						<div className="flex items-center gap-2">
							<KolButton _label="Copy to clipboard (ISO)" _disabled={!isoFromUs} _on={{ onClick: () => copyToClipboard(isoFromUs) }} />
							{isoFromUs ? <code className="opacity-70">→ {isoFromUs}</code> : <span className="text-red-600">Invalid date</span>}
						</div>

						<KolInputDate _type="date" _label="Date (paste here with Ctrl+V)" className="w-full" />
					</div>
				</section>

				<p aria-live="polite" role="status" className="mt-2 opacity-80">
					{status}
				</p>
			</div>
		</>
	);
};
