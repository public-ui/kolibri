import { useState } from 'react';
import { formatReviewComment, summarize } from './review-comment';
import type { Entry, ReviewDraft, ReviewState, StatusFile } from './types';

interface Props {
	entry: Entry;
	draft: ReviewDraft;
	status: StatusFile | null;
	onChange: (draft: ReviewDraft) => void;
	pageUrl: string;
	prUrl: string | null;
	auth: { login: string | null; saving: boolean; error: string | null; dirty: boolean; onSave: () => void };
}

export function draftState(draft: ReviewDraft, key: string, hash: string, digest: string): ReviewState {
	if (draft.rejects.some((entry) => entry.item === key && entry.hash === hash)) return 'rejected';
	if (draft.approveAll?.digest === digest || draft.approvals.some((entry) => entry.item === key && entry.hash === hash)) return 'approved';
	return 'open';
}

function without<T extends { item: string }>(list: T[], key: string): T[] {
	return list.filter((entry) => entry.item !== key);
}

export function ReviewPanel({ entry, draft, status, onChange, pageUrl, prUrl, auth }: Props) {
	const { key, item } = entry;
	const [noteText, setNoteText] = useState('');
	const [copied, setCopied] = useState(false);
	const serverState = status?.items[key];
	const note = draft.notes.find((candidate) => candidate.item === key);
	const needsDecision = item.status !== 'unchanged' && item.status !== 'error';

	const approve = () =>
		onChange({ ...draft, approvals: [...without(draft.approvals, key), { item: key, hash: item.hash }], rejects: without(draft.rejects, key) });
	const reject = () =>
		onChange({ ...draft, rejects: [...without(draft.rejects, key), { item: key, hash: item.hash }], approvals: without(draft.approvals, key) });
	const clear = () => onChange({ ...draft, approvals: without(draft.approvals, key), rejects: without(draft.rejects, key) });
	const saveNote = () => {
		const notes = without(draft.notes, key);
		if (noteText.trim()) notes.push({ item: key, hash: item.hash, text: noteText.trim() });
		onChange({ ...draft, notes });
		setNoteText('');
	};
	const copyComment = async () => {
		const body = formatReviewComment(draft, pageUrl, summarize(draft));
		try {
			await navigator.clipboard.writeText(body);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 2000);
		} catch {
			window.prompt('Copy the comment and post it on the pull request:', body);
		}
	};

	return (
		<section className="review" aria-label="Review">
			<h2 className="review-title">
				<code>{key}</code>
			</h2>
			<dl className="review-facts">
				<dt>Route</dt>
				<dd>{item.route}</dd>
				<dt>Status</dt>
				<dd>
					{item.status}
					{item.diffPixels !== undefined && ` – ${item.diffPixels} px (${((item.diffRatio ?? 0) * 100).toFixed(2)} %)`}
					{item.sizeMismatch && ` – size ${item.sizeMismatch.expected.join('×')} → ${item.sizeMismatch.actual.join('×')}`}
				</dd>
				<dt>Published review</dt>
				<dd>
					{serverState ? (
						<>
							{serverState.state}
							{serverState.by && ` by ${serverState.by}`}
						</>
					) : (
						'none'
					)}
					{serverState?.notes.map((serverNote, index) => (
						<div key={index} className="review-note">
							💬 <strong>{serverNote.by}</strong>: {serverNote.text}
						</div>
					))}
				</dd>
			</dl>

			{needsDecision && (
				<div className="review-actions" role="group" aria-label="Decision">
					<button type="button" onClick={approve} aria-pressed={draftState(draft, key, item.hash, '') === 'approved'}>
						Approve
					</button>
					<button type="button" onClick={reject} aria-pressed={draftState(draft, key, item.hash, '') === 'rejected'}>
						Reject
					</button>
					<button type="button" onClick={clear}>
						Clear
					</button>
				</div>
			)}

			<label className="review-note-input">
				Note for this snapshot
				<textarea value={noteText || note?.text || ''} onChange={(event) => setNoteText(event.target.value)} rows={2} />
			</label>
			<button type="button" onClick={saveNote}>
				{note ? 'Update note' : 'Add note'}
			</button>

			<div className="review-submit">
				<p>
					Your review: <strong>{summarize(draft)}</strong>
					{auth.dirty && <span className="is-unsaved"> – not saved yet</span>}
				</p>
				{auth.login ? (
					<button type="button" onClick={auth.onSave} disabled={auth.saving || !auth.dirty}>
						{auth.saving ? 'Saving…' : `Save to pull request as ${auth.login}`}
					</button>
				) : (
					<>
						<button type="button" onClick={copyComment}>
							{copied ? 'Copied!' : 'Copy comment for the pull request'}
						</button>
						{prUrl && (
							<a href={prUrl} target="_blank" rel="noreferrer">
								Open the pull request
							</a>
						)}
					</>
				)}
				{auth.error && (
					<p className="error" role="alert">
						{auth.error}
					</p>
				)}
			</div>
		</section>
	);
}
