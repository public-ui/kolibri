import type { ReactElement } from 'react';
import type { Entry, ItemStatus, ReviewState } from './types';

interface Props {
	entries: Entry[];
	selected: string | null;
	reviewStates: Record<string, { state: ReviewState; unsaved: boolean }>;
	onSelect: (key: string) => void;
}

const STATUS_LABEL: Record<ItemStatus, string> = { unchanged: '=', changed: '≠', added: '+', removed: '−', error: '!' };
const REVIEW_ICON: Record<ReviewState, string> = { open: '', approved: '✓', rejected: '✗' };

export function ItemList({ entries, selected, reviewStates, onSelect }: Props) {
	if (entries.length === 0) {
		return <p className="list-empty">No snapshots match the current filter.</p>;
	}
	let currentPackage = '';
	const rows: ReactElement[] = [];
	for (const entry of entries) {
		if (entry.pkg.package !== currentPackage) {
			currentPackage = entry.pkg.package;
			rows.push(
				<li key={`pkg:${currentPackage}`} className="list-package" role="presentation">
					{currentPackage}
				</li>,
			);
		}
		const review = reviewStates[entry.key];
		rows.push(
			<li key={entry.key}>
				<button
					type="button"
					className={`list-item status-${entry.item.status}${entry.key === selected ? ' is-selected' : ''}`}
					aria-current={entry.key === selected ? 'true' : undefined}
					onClick={() => onSelect(entry.key)}
				>
					<span className="list-status" aria-label={entry.item.status} title={entry.item.status}>
						{STATUS_LABEL[entry.item.status]}
					</span>
					<span className="list-name">{entry.item.name}</span>
					{review && review.state !== 'open' && (
						<span
							className={`list-review review-${review.state}${review.unsaved ? ' is-unsaved' : ''}`}
							title={review.unsaved ? `${review.state} (not saved yet)` : review.state}
						>
							{REVIEW_ICON[review.state]}
						</span>
					)}
				</button>
			</li>,
		);
	}
	return (
		<ul className="list" aria-label="Snapshots">
			{rows}
		</ul>
	);
}
