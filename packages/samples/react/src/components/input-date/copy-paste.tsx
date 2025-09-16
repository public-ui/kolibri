import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { KolButton, KolInputDate, KolInputText } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';

const DEFAULT_GERMAN_DATE = '31.12.2025';

const pad2 = (value: number): string => String(value).padStart(2, '0');

const parseGermanDate = (value: string): string | null => {
	const match = value.trim().match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
	if (!match) {
		return null;
	}

	const day = Number(match[1]);
	const month = Number(match[2]);
	const year = Number(match[3]);
	const candidate = new Date(year, month - 1, day);

	if (candidate.getFullYear() !== year || candidate.getMonth() !== month - 1 || candidate.getDate() !== day) {
		return null;
	}

	return `${year}-${pad2(month)}-${pad2(day)}`;
};

const formatDate = (value: Date): string => `${value.getFullYear()}-${pad2(value.getMonth() + 1)}-${pad2(value.getDate())}`;

const toIsoValue = (value: unknown): string => {
	if (typeof value === 'string') {
		return value;
	}
	if (value instanceof Date) {
		return formatDate(value);
	}
	return String(value ?? '');
};

export const InputDateCopyPaste: React.FC = () => {
	const [germanDate, setGermanDate] = useState<string>(DEFAULT_GERMAN_DATE);
	const [isoDate, setIsoDate] = useState<string>(() => parseGermanDate(DEFAULT_GERMAN_DATE) ?? '');
	const [status, setStatus] = useState<string>('');
	const dateFieldRef = useRef<HTMLKolInputDateElement | null>(null);

	const isGermanDateValid = useMemo(() => parseGermanDate(germanDate) !== null, [germanDate]);

	useEffect(() => {
		const host = dateFieldRef.current;
		if (!(host instanceof HTMLElement)) {
			return;
		}

		const handlePaste: EventListener = (event) => {
			const clipboardEvent = event as ClipboardEvent;
			const raw = clipboardEvent.clipboardData?.getData('text') ?? '';
			const iso = parseGermanDate(raw);

			if (!iso) {
				setStatus('Clipboard: unrecognized date. Use DD.MM.YYYY.');
				return;
			}

			clipboardEvent.preventDefault();
			setIsoDate(iso);
			setStatus('Pasted.');
		};

		host.addEventListener('paste', handlePaste);
		return () => host.removeEventListener('paste', handlePaste);
	}, []);

	const handleGermanInput = useCallback((_event: Event, value: unknown) => {
		setStatus('');
		setGermanDate(typeof value === 'string' ? value : String(value ?? ''));
	}, []);

	const copyToClipboard = useCallback(async () => {
		setStatus('');
		try {
			await navigator.clipboard.writeText(germanDate);
			setStatus('Copied.');
		} catch {
			setStatus('Copy failed. Your browser may block clipboard access.');
		}
	}, [germanDate]);

	const handleIsoInput = useCallback((_event: Event, value: unknown) => {
		setStatus('');
		setIsoDate(toIsoValue(value));
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
							_value={germanDate}
							_type="text"
							_on={{
								onInput: handleGermanInput,
								onChange: handleGermanInput,
							}}
						/>

						<small className="opacity-80">Click the button to copy the exact German date, then paste it into the date field below.</small>

						<div className="flex items-center gap-2">
							<KolButton _label="Copy to Clipboard" _disabled={!isGermanDateValid} _on={{ onClick: copyToClipboard }} />
							{!isGermanDateValid && <span className="text-red-600">Invalid date</span>}
						</div>

						<KolInputDate
							ref={dateFieldRef}
							_type="date"
							_label="Date (paste here with Ctrl+V)"
							className="w-full"
							_value={isoDate}
							_on={{
								onInput: handleIsoInput,
								onChange: handleIsoInput,
							}}
						/>
					</div>
				</section>

				<p aria-live="polite" role="status" className="mt-2 opacity-80">
					{status}
				</p>
			</div>
		</>
	);
};
