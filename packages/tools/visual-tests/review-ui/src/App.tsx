import { useCallback, useEffect, useMemo, useState } from 'react';
import { findOwnReview, getLogin, listComments, saveReview } from './github';
import { ItemList } from './ItemList';
import { emptyDraft, formatReviewComment, summarize } from './review-comment';
import { draftState, ReviewPanel } from './ReviewPanel';
import { entryKey, type Entry, type ItemStatus, type Report, type ReviewDraft, type ReviewState, type StatusFile } from './types';
import { MODES, Viewer, type Mode } from './Viewer';

const TOKEN_KEY = 'visual-review.token';
const DEFAULT_FILTER: Record<ItemStatus, boolean> = { changed: true, added: true, removed: true, error: true, unchanged: false };

function readToken(): string {
	try {
		return sessionStorage.getItem(TOKEN_KEY) ?? localStorage.getItem(TOKEN_KEY) ?? '';
	} catch {
		return '';
	}
}

function storeToken(token: string, remember: boolean) {
	try {
		sessionStorage.setItem(TOKEN_KEY, token);
		if (remember) localStorage.setItem(TOKEN_KEY, token);
		else localStorage.removeItem(TOKEN_KEY);
	} catch {
		/* storage unavailable – token lives in memory only */
	}
}

function draftKey(pr: number) {
	return `visual-review.draft.${pr}`;
}

export function App() {
	const params = new URLSearchParams(window.location.search);
	const pr = Number(params.get('pr'));
	/* `src` lets a local run point at any folder that holds report.json; the deployed page reads pr-<n>/. */
	const base = params.get('src') ?? `pr-${pr}`;
	const pageUrl = `${window.location.origin}${window.location.pathname}?pr=${pr}`;

	const [report, setReport] = useState<Report | null>(null);
	const [status, setStatus] = useState<StatusFile | null>(null);
	const [loadError, setLoadError] = useState<string | null>(null);
	const [filter, setFilter] = useState(DEFAULT_FILTER);
	const [onlyOpen, setOnlyOpen] = useState(false);
	const [search, setSearch] = useState('');
	const [selected, setSelected] = useState<string | null>(window.location.hash.replace(/^#/, '') || null);
	const [mode, setMode] = useState<Mode>('side-by-side');
	const [zoom, setZoom] = useState(1);
	const [draft, setDraft] = useState<ReviewDraft>(emptyDraft);
	const [savedDraft, setSavedDraft] = useState<string>(JSON.stringify(emptyDraft()));
	const [token, setToken] = useState(readToken);
	const [remember, setRemember] = useState(false);
	const [login, setLogin] = useState<string | null>(null);
	const [ownCommentId, setOwnCommentId] = useState<number | null>(null);
	const [saving, setSaving] = useState(false);
	const [authError, setAuthError] = useState<string | null>(null);

	useEffect(() => {
		if (!pr && !params.get('src')) {
			setLoadError('Add ?pr=<number> to the address to open the review of a pull request.');
			return;
		}
		fetch(`${base}/report.json?ts=${Date.now()}`)
			.then((response) => (response.ok ? response.json() : Promise.reject(new Error(`${response.status} ${response.statusText}`))))
			.then((data: Report) => setReport(data))
			.catch((error: Error) => setLoadError(`No report found under ${base}/ (${error.message}). Has the CI run of the pull request finished?`));
		fetch(`${base}/status.json?ts=${Date.now()}`)
			.then((response) => (response.ok ? response.json() : null))
			.then((data: StatusFile | null) => setStatus(data))
			.catch(() => setStatus(null));
		try {
			const stored = localStorage.getItem(draftKey(pr));
			if (stored) setDraft(JSON.parse(stored) as ReviewDraft);
		} catch {
			/* ignore */
		}
	}, [base, pr]);

	useEffect(() => {
		try {
			localStorage.setItem(draftKey(pr), JSON.stringify(draft));
		} catch {
			/* ignore */
		}
	}, [draft, pr]);

	const repository = report?.repository ?? null;

	const connect = useCallback(async () => {
		if (!token || !repository || !pr) return;
		setAuthError(null);
		try {
			const user = await getLogin(token);
			setLogin(user);
			storeToken(token, remember);
			const comments = await listComments(token, repository, pr);
			const own = findOwnReview(comments, user);
			if (own) {
				setOwnCommentId(own.comment.id);
				setDraft(own.draft);
				setSavedDraft(JSON.stringify(own.draft));
			} else {
				setOwnCommentId(null);
			}
		} catch (error) {
			setLogin(null);
			setAuthError(`Token rejected: ${(error as Error).message}`);
		}
	}, [token, repository, pr, remember]);

	/* Connect a stored token once the report (and with it the repository) is known – not on every keystroke. */
	useEffect(() => {
		if (token && repository && !login) void connect();
	}, [repository]); // eslint-disable-line react-hooks/exhaustive-deps

	const save = useCallback(async () => {
		if (!login || !repository) return;
		setSaving(true);
		setAuthError(null);
		try {
			const body = formatReviewComment(draft, pageUrl, summarize(draft));
			await saveReview(token, repository, pr, body, ownCommentId);
			setSavedDraft(JSON.stringify(draft));
			const comments = await listComments(token, repository, pr);
			setOwnCommentId(findOwnReview(comments, login)?.comment.id ?? null);
		} catch (error) {
			setAuthError(`Saving failed: ${(error as Error).message}`);
		} finally {
			setSaving(false);
		}
	}, [draft, login, repository, pr, token, ownCommentId, pageUrl]);

	const entries = useMemo<Entry[]>(() => {
		if (!report) return [];
		return report.packages.flatMap((pkg) => pkg.items.map((item) => ({ key: entryKey(pkg, item), pkg, item })));
	}, [report]);

	const reviewStates = useMemo(() => {
		const states: Record<string, { state: ReviewState; unsaved: boolean }> = {};
		const saved = JSON.parse(savedDraft) as ReviewDraft;
		for (const entry of entries) {
			const local = draftState(draft, entry.key, entry.item.hash, report?.digest ?? '');
			const persisted = draftState(saved, entry.key, entry.item.hash, report?.digest ?? '');
			const server = status?.items[entry.key]?.state ?? 'open';
			states[entry.key] = local !== 'open' ? { state: local, unsaved: local !== persisted } : { state: server, unsaved: false };
		}
		return states;
	}, [entries, draft, savedDraft, status, report]);

	const visible = useMemo(() => {
		const needle = search.trim().toLowerCase();
		return entries.filter((entry) => {
			if (!filter[entry.item.status]) return false;
			if (onlyOpen && reviewStates[entry.key]?.state !== 'open') return false;
			if (needle && !entry.key.toLowerCase().includes(needle)) return false;
			return true;
		});
	}, [entries, filter, onlyOpen, search, reviewStates]);

	const current = entries.find((entry) => entry.key === selected) ?? null;

	const select = useCallback((key: string | null) => {
		setSelected(key);
		window.history.replaceState(null, '', key ? `#${key}` : window.location.pathname + window.location.search);
	}, []);

	useEffect(() => {
		const handler = (event: KeyboardEvent) => {
			if ((event.target as HTMLElement | null)?.closest('input, textarea, select')) return;
			const index = visible.findIndex((entry) => entry.key === selected);
			if (event.key === 'j' || event.key === 'ArrowDown') {
				event.preventDefault();
				select(visible[Math.min(index + 1, visible.length - 1)]?.key ?? null);
			} else if (event.key === 'k' || event.key === 'ArrowUp') {
				event.preventDefault();
				select(visible[Math.max(index - 1, 0)]?.key ?? null);
			} else if (event.key === 'a' && current && current.item.status !== 'unchanged' && current.item.status !== 'error') {
				setDraft((value) => ({
					...value,
					approvals: [...value.approvals.filter((entry) => entry.item !== current.key), { item: current.key, hash: current.item.hash }],
					rejects: value.rejects.filter((entry) => entry.item !== current.key),
				}));
			}
		};
		window.addEventListener('keydown', handler);
		return () => window.removeEventListener('keydown', handler);
	}, [visible, selected, current, select]);

	const dirty = JSON.stringify(draft) !== savedDraft;
	const openCount = entries.filter(
		(entry) => reviewStates[entry.key]?.state === 'open' && entry.item.status !== 'unchanged' && entry.item.status !== 'error',
	).length;

	if (loadError) {
		return (
			<main className="page">
				<h1>Visual Review</h1>
				<p className="error" role="alert">
					{loadError}
				</p>
			</main>
		);
	}
	if (!report) {
		return (
			<main className="page">
				<h1>Visual Review</h1>
				<p>Loading report…</p>
			</main>
		);
	}

	const prUrl = repository ? `https://github.com/${repository}/pull/${report.pr}` : null;

	return (
		<div className="layout">
			<header className="header">
				<h1>
					Visual Review{' '}
					{prUrl ? (
						<a href={prUrl} target="_blank" rel="noreferrer">
							#{report.pr}
						</a>
					) : (
						`#${report.pr}`
					)}
				</h1>
				<p className="header-meta">
					Commit <code>{report.head.slice(0, 10)}</code>
					{report.baseline?.sha && (
						<>
							{' '}
							· baseline <code>{report.baseline.sha.slice(0, 10)}</code> ({report.baseline.ref})
							{report.baseline.fallback && <span className="warn"> · fallback: {report.baseline.fallback}</span>}
							{report.baseline.imageMismatch && <span className="warn"> · Playwright image differs from the baseline</span>}
						</>
					)}
					{' · '}
					{report.summary.changed} changed, {report.summary.added} added, {report.summary.removed} removed, {report.summary.error} error,{' '}
					{report.summary.unchanged} unchanged
				</p>
				<p className={`header-status state-${status?.state ?? 'unknown'}`}>
					{status ? `${status.state}: ${status.description}` : 'Status not computed yet'}
					{status && status.head !== report.head && <span className="warn"> · status belongs to an older commit</span>}
				</p>
			</header>

			<aside className="sidebar">
				<div className="filters">
					<input type="search" placeholder="Filter by name" value={search} onChange={(event) => setSearch(event.target.value)} aria-label="Filter by name" />
					<div className="filter-row">
						{(Object.keys(DEFAULT_FILTER) as ItemStatus[]).map((statusName) => (
							<label key={statusName}>
								<input type="checkbox" checked={filter[statusName]} onChange={(event) => setFilter({ ...filter, [statusName]: event.target.checked })} />
								{statusName} ({report.summary[statusName]})
							</label>
						))}
						<label>
							<input type="checkbox" checked={onlyOpen} onChange={(event) => setOnlyOpen(event.target.checked)} />
							only open ({openCount})
						</label>
					</div>
					<button
						type="button"
						onClick={() => setDraft((value) => ({ ...value, approveAll: { digest: report.digest } }))}
						disabled={openCount === 0 || draft.approveAll?.digest === report.digest}
					>
						Approve all open changes
					</button>
				</div>
				<ItemList entries={visible} selected={selected} reviewStates={reviewStates} onSelect={select} />
				<p className="hint">Keys: j / k next and previous, a approve.</p>
			</aside>

			<main className="main">
				{current ? (
					<>
						<div className="toolbar" role="toolbar" aria-label="View">
							{MODES.map((candidate) => (
								<button key={candidate.id} type="button" aria-pressed={mode === candidate.id} onClick={() => setMode(candidate.id)}>
									{candidate.label}
								</button>
							))}
							<label>
								Zoom {Math.round(zoom * 100)}%
								<input type="range" min={0.25} max={4} step={0.25} value={zoom} onChange={(event) => setZoom(Number(event.target.value))} />
							</label>
						</div>
						<div className="viewer">
							<Viewer entry={current} base={base} mode={mode} zoom={zoom} />
						</div>
						<ReviewPanel
							entry={current}
							draft={draft}
							status={status}
							onChange={setDraft}
							pageUrl={pageUrl}
							prUrl={prUrl}
							auth={{ login, saving, error: authError, dirty, onSave: save }}
						/>
					</>
				) : (
					<p className="viewer-note">Select a snapshot from the list.</p>
				)}
				{report.packages.some((pkg) => pkg.errors.length > 0) && (
					<section className="errors" aria-label="Failed routes">
						<h2>Routes that could not be compared</h2>
						<ul>
							{report.packages.flatMap((pkg) =>
								pkg.errors.map((error, index) => (
									<li key={`${pkg.package}-${index}`}>
										<code>{pkg.package}</code> {error.route}: {error.message}
									</li>
								)),
							)}
						</ul>
					</section>
				)}
			</main>

			<footer className="auth">
				{login ? (
					<span>
						Connected as <strong>{login}</strong>.{' '}
						<button
							type="button"
							onClick={() => {
								setLogin(null);
								setToken('');
								storeToken('', false);
							}}
						>
							Disconnect
						</button>
					</span>
				) : (
					<form
						onSubmit={(event) => {
							event.preventDefault();
							void connect();
						}}
					>
						<label>
							GitHub token (fine-grained, <em>Pull requests: read and write</em> on this repository) to save your review directly
							<input type="password" value={token} onChange={(event) => setToken(event.target.value)} autoComplete="off" />
						</label>
						<label>
							<input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} /> remember in this browser
						</label>
						<button type="submit" disabled={!token || !repository}>
							Connect
						</button>
						<span className="hint">Without a token, copy the generated comment and post it on the pull request yourself.</span>
					</form>
				)}
			</footer>
		</div>
	);
}
