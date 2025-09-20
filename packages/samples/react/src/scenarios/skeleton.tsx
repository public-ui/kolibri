import React, { useRef, useState } from 'react';
import type { FC } from 'react';

import { KolButton, KolSkeleton } from '@public-ui/react-v19';
import { SampleDescription } from '../components/SampleDescription';

interface EventLogEntry {
	timestamp: string;
	count: number;
	id: number;
}

export const Skeleton: FC = () => {
	const skeletonRef = useRef<HTMLKolSkeletonElement>(null);
	const initialCount = 3;
	const [count, setCount] = useState<number>(initialCount);
	const [eventLog, setEventLog] = useState<EventLogEntry[]>([]);
	const [lastEventTime, setLastEventTime] = useState<string>('');
	const [eventCount, setEventCount] = useState<number>(0);

	const handleLoaded = (event: CustomEvent<number>) => {
		const now = new Date();
		const timestamp = now.toLocaleTimeString('de-DE');
		const newEventCount = eventCount + 1;

		setCount(event.detail);
		setLastEventTime(timestamp);
		setEventCount(newEventCount);

		// Add to event log (keep only last 5 entries)
		setEventLog((prev) => {
			const newEntry: EventLogEntry = {
				timestamp,
				count: event.detail,
				id: newEventCount,
			};
			return [newEntry, ...prev.slice(0, 4)];
		});
	};

	return (
		<>
			<SampleDescription>
				<p>
					KolSkeleton demonstriert Event-Emitter mit automatischem Intervall. Die Komponente emittiert alle 2 Sekunden ein &quot;loaded&quot; Event mit dem
					aktuellen Count-Wert. Über die Buttons kann die Komponente getoggled und fokussiert werden. Der interne ClickButton erhöht bei Klick den Counter.
				</p>
			</SampleDescription>

			<div className="flex gap-4 mb-4">
				<KolButton
					_label="Toggle Sichtbarkeit"
					_on={{
						onClick: () => skeletonRef.current?.kolToggle(),
					}}
					_variant="primary"
				/>
				<KolButton
					_label="Fokus auf Button"
					_on={{
						onClick: () => skeletonRef.current?.kolFocus(),
					}}
					_variant="secondary"
				/>
			</div>

			<KolSkeleton _count={initialCount} _label="Click Button" _name="Example" onLoaded={handleLoaded} ref={skeletonRef} />

			<div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
				<h3 className="text-lg font-semibold mb-3">Event Monitor</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<p className="font-medium">Aktueller Count-Wert:</p>
						<p className="text-2xl font-bold text-blue-600" aria-live="polite">
							{count}
						</p>
					</div>
					<div>
						<p className="font-medium">Letztes Event:</p>
						<p className="text-lg" aria-live="polite">
							{lastEventTime || 'Noch kein Event empfangen'}
						</p>
					</div>
				</div>
				<div className="mt-4">
					<p className="font-medium mb-2">
						Events empfangen: <span className="font-bold">{eventCount}</span>
					</p>
					{eventLog.length > 0 && (
						<div>
							<p className="font-medium mb-2">Event-Historie (letzte 5):</p>
							<ul className="text-sm space-y-1 max-h-32 overflow-y-auto">
								{eventLog.map((entry) => (
									<li key={entry.id} className="flex justify-between items-center p-2 bg-white rounded border">
										<span>
											#{entry.id}: Count = {entry.count}
										</span>
										<span className="text-gray-500">{entry.timestamp}</span>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
				<div className="mt-4 p-3 bg-blue-50 rounded">
					<p className="text-sm text-blue-800">
						💡 <strong>Tipp:</strong> Die Komponente emittiert automatisch alle 2 Sekunden ein Event. Klicke auf den &quot;Click Button&quot; in der Komponente,
						um den Count-Wert zu erhöhen.
					</p>
				</div>
			</div>
		</>
	);
};
