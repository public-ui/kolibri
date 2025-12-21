import { KolButton, KolInputDate, KolInputText } from '@public-ui/react-v19';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SampleDescription } from '../SampleDescription';

/** -----------------------------
 * Types & helpers
 * ----------------------------- */
const pad2 = (n: number): string => String(n).padStart(2, '0');

type Year = `${number}`;
type Month = `${number}`;
type Day = `${number}`;
type IsoDate = `${Year}-${Month}-${Day}`;

const isValidYmd = (y: number, m: number, d: number): boolean => {
	const dt = new Date(y, m - 1, d);
	return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;
};

/** Parse ONLY German format DD.MM.YYYY to ISO (internal use) */
function parseDeToIso(input: string): IsoDate | null {
	const m = /^\s*(\d{1,2})\.(\d{1,2})\.(\d{4})\s*$/.exec(input);
	if (!m) return null;
	const d = +m[1];
	const mo = +m[2];
	const y = +m[3];
	if (!isValidYmd(y, mo, d)) return null;
	return `${y}-${pad2(mo)}-${pad2(d)}` as IsoDate;
}

/** -----------------------------
 * Typed Web Component bridge
 * ----------------------------- */
type SetIsoValueMethod = (iso: IsoDate | null) => Promise<void>;

type KolInputDateHost = HTMLElement & {
	setIsoValue?: SetIsoValueMethod;
	value?: string;
	_value?: IsoDate | Date | null;
};

function isKolHost(n: EventTarget): n is KolInputDateHost {
	return n instanceof HTMLElement && n.tagName === 'KOL-INPUT-DATE';
}

async function setKolInputDateValue(host: KolInputDateHost, iso: IsoDate): Promise<void> {
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
 * React component
 * ----------------------------- */
export const InputDateCopyPaste: React.FC = () => {
	const [deValue, setDeValue] = useState<string>('31.12.2025');
	const [status, setStatus] = useState<string>('');
	const activeKolHostRef = useRef<KolInputDateHost | null>(null);

	const isoFromDe = useMemo(() => parseDeToIso(deValue), [deValue]);

	// Track focus target inside shadow DOM
	useEffect(() => {
		const ac = new AbortController();
		const onFocusIn = (e: Event): void => {
			const path = (e.composedPath?.() ?? []) as EventTarget[];
			activeKolHostRef.current = path.find(isKolHost) ?? null;
		};
		document.addEventListener('focusin', onFocusIn, { capture: true, signal: ac.signal });
		return () => ac.abort();
	}, []);

	// Global paste handler: read German date from clipboard, convert to ISO internally, inject into KolInputDate
	useEffect(() => {
		const ac = new AbortController();

		const onPaste = (e: ClipboardEvent): void => {
			const host = activeKolHostRef.current;
			if (!host || !isKolHost(host)) return;

			const raw = e.clipboardData?.getData('text') ?? '';
			const iso = parseDeToIso(raw);

			if (!iso) {
				setStatus('Clipboard: unrecognized date. Use DD.MM.YYYY.');
				return;
			}

			e.preventDefault();
			void setKolInputDateValue(host, iso);
			setStatus('Pasted.');
		};

		document.addEventListener('paste', onPaste, { capture: true, signal: ac.signal });
		return () => ac.abort();
	}, []);

	const copyToClipboard = useCallback(async (text: string): Promise<void> => {
		setStatus('');
		try {
			await navigator.clipboard.writeText(text);
			setStatus('Copied.');
		} catch {
			setStatus('Copy failed. Your browser may block clipboard access.');
		}
	}, []);

	/** -----------------------------
	 * KolInputText handlers (match signature: (event, value: unknown) => void)
	 * ----------------------------- */
	const handleDeInput = useCallback((event: Event, value: unknown) => {
		if (event?.target) {
			const next = typeof value === 'string' ? value : String(value ?? '');
			setDeValue(next);
		}
	}, []);

	return (
		<>
			<SampleDescription>
				<p>
					Type a date in German format (<code>DD.MM.YYYY</code>), click <em>Copy to Clipboard</em>, then paste it into the date field below with <kbd>Ctrl</kbd>
					+<kbd>V</kbd>. The ISO conversion happens internally.
				</p>
			</SampleDescription>

			<div className="grid gap-8" lang="en">
				<section aria-labelledby="de-title">
					<h3 id="de-title" className="text-lg font-semibold mb-2">
						German date (DD.MM.YYYY)
					</h3>

					<div className="grid gap-3">
						<KolInputText
							className="w-full"
							_label="German date (DD.MM.YYYY)"
							_placeholder="e.g., 31.12.2025"
							_value={deValue}
							_type="text"
							_on={{
								onInput: handleDeInput,
								onChange: handleDeInput,
							}}
						/>

						<small className="opacity-80">Click the button to copy the exact German date, then paste it into the date field below.</small>

						<div className="flex items-center gap-2">
							<KolButton _label="Copy to Clipboard" _on={{ onClick: () => copyToClipboard(deValue) }} />
							{!isoFromDe && <span className="text-red-600">Invalid date</span>}
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
