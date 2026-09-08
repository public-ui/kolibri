/**
 * Turns a merged report plus the reviewers' comments into the state of the `Visual Review` commit
 * status and the `status.json` the review page shows. Pure – no I/O.
 *
 * Rules:
 * - any route error → failure (the comparison itself is broken, nothing to approve)
 * - an item is approved when a reviewer with write access approved its hash (or the whole report
 *   digest) and nobody rejected that hash; a rejection wins over an approval → failure
 * - only the newest comment of each reviewer counts: a reviewer who pastes a fresh comment instead
 *   of editing the old one replaces their earlier verdicts, they do not accumulate
 * - success once every changed/added/removed item is approved; pending otherwise
 */
export const NEEDS_APPROVAL = new Set(['changed', 'added', 'removed']);
export const WRITE_ROLES = new Set(['write', 'maintain', 'admin']);
const DESCRIPTION_LIMIT = 140;

export function itemKey(pkg, item) {
	return `${pkg.package}/${item.name}`;
}

/**
 * @param report merged report.json
 * @param reviews [{ author, role, data, updatedAt }] – `data` as parsed by review-comment.mjs, `role`
 *   the author's repository permission (`admin`, `maintain`, `write`, `triage`, `read`, `none`)
 */
export function computeStatus(report, reviews) {
	const trusted = latestPerAuthor(reviews.filter((review) => review.data && WRITE_ROLES.has(review.role)));
	const items = {};
	let open = 0;
	let approved = 0;
	let rejected = 0;
	let errorItems = 0;

	for (const pkg of report.packages) {
		for (const item of pkg.items) {
			if (item.status === 'error') errorItems += 1;
			if (!NEEDS_APPROVAL.has(item.status)) continue;
			const key = itemKey(pkg, item);
			const state = { state: 'open', notes: [] };
			for (const review of trusted) {
				const approves =
					review.data.approveAll?.digest === report.digest || review.data.approvals.some((entry) => entry.item === key && entry.hash === item.hash);
				const rejects = review.data.rejects.some((entry) => entry.item === key && entry.hash === item.hash);
				for (const note of review.data.notes) {
					if (note.item === key) state.notes.push({ by: review.author, text: note.text });
				}
				if (rejects) {
					state.state = 'rejected';
					state.by = review.author;
				} else if (approves && state.state !== 'rejected') {
					state.state = 'approved';
					state.by = review.author;
				}
			}
			if (state.state === 'open') open += 1;
			if (state.state === 'approved') approved += 1;
			if (state.state === 'rejected') rejected += 1;
			items[key] = state;
		}
	}

	const routeErrors = report.packages.reduce((sum, pkg) => sum + (pkg.errors?.length ?? 0), 0);
	const changes = open + approved + rejected;
	const reviewers = [...new Set(trusted.map((review) => review.author))];
	let state;
	let description;
	if (routeErrors > 0 || errorItems > 0) {
		state = 'failure';
		description = `${routeErrors} route(s) failed before the screenshots could be compared`;
	} else if (rejected > 0) {
		state = 'failure';
		description = `${rejected} of ${changes} visual changes rejected`;
	} else if (open > 0) {
		state = 'pending';
		description = `${describeChanges(report)} – ${approved} of ${changes} approved, review pending`;
	} else if (changes > 0) {
		state = 'success';
		description = `${changes} visual changes approved by ${reviewers.join(', ')}`;
	} else {
		state = 'success';
		description = 'No visual changes';
	}

	return {
		state,
		description: truncate(description),
		status: {
			schema: 1,
			state,
			description: truncate(description),
			computedAt: new Date().toISOString(),
			pr: report.pr,
			head: report.head,
			digest: report.digest,
			counts: { changes, open, approved, rejected, routeErrors, errorItems },
			reviewers,
			items,
		},
	};
}

/** One review per author – the most recently updated comment; on equal timestamps the later one. */
function latestPerAuthor(reviews) {
	const latest = new Map();
	for (const review of reviews) {
		const current = latest.get(review.author);
		if (!current || Date.parse(review.updatedAt ?? 0) >= Date.parse(current.updatedAt ?? 0)) latest.set(review.author, review);
	}
	return [...latest.values()];
}

function describeChanges(report) {
	const totals = { changed: 0, added: 0, removed: 0 };
	for (const pkg of report.packages) {
		for (const status of Object.keys(totals)) totals[status] += pkg.summary?.[status] ?? 0;
	}
	return Object.entries(totals)
		.filter(([, count]) => count > 0)
		.map(([status, count]) => `${count} ${status}`)
		.join(', ');
}

function truncate(text) {
	return text.length > DESCRIPTION_LIMIT ? `${text.slice(0, DESCRIPTION_LIMIT - 1)}…` : text;
}
