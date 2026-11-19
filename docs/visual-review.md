# Visual Review

How screenshot changes of the KoliBri themes are detected, published and approved.

## In one picture

```
push to develop ──► Visual Baseline workflow ──► artifact visual-baseline-<package> (per commit, 90 days)

pull request push ──► CI-Pipeline, job visual-tests (<package>)
                        compares against the baseline of the base commit
                        ──► artifact visual-review-<package> (report.json + changed images)
                                  │
                                  ▼
                       Visual Review workflow (base repository context)
                         publishes visual/pr-<n>/ on GitHub Pages
                         reads the reviewers' comments and review texts
                         sets the commit status "Visual Review"
                                  │
                                  ▼
reviewer ──► https://public-ui.github.io/kolibri/visual/?pr=<n>
               inspects baseline / actual / diff, approves or rejects, leaves notes
               saves the review as a pull-request comment (directly with a token, or by pasting it
               as a comment or as the text of a pull-request review)
```

## What a contributor sees

- The job `visual-tests (<package>)` of the CI-Pipeline fails when screenshots differ – that is
  expected and not something to "fix" by regenerating snapshots. The job summary lists what changed.
- The bot comment **📸 Visual Review** on the pull request links the review page and shows the counts
  per package.
- The commit status **Visual Review** stays `pending` until a reviewer with write access approved every
  changed, added and removed screenshot, turns `success` then, and `failure` when a screenshot was
  rejected or a route could not be compared at all (missing block, timeout).
- Docs-only pull requests get `success` immediately; nothing to review.

Nothing has to be committed: the baseline is regenerated from `develop` after the merge.

## What a reviewer does

1. Open the review page from the bot comment (or the status link).
2. Walk through the changed, added and removed snapshots (`j`/`k` or the list). Compare with
   _side by side_, _slider_, _onion skin_, _diff_ or _blink_; zoom in for subpixel changes.
3. Approve (`a`), reject (`r`) or annotate each one – or **Approve all open changes** for an intentional
   sweep such as a browser upgrade. `a` and `r` move on to the next snapshot.
4. Save the review:
   - **with a token**: enter a fine-grained personal access token with _Pull requests: read and write_
     for `public-ui/kolibri` at the bottom of the page. The page posts (and later edits) one comment
     in your name. The token stays in this browser session unless you tick "remember".
   - **without a token**: click _Copy comment for the pull request_ and paste it on the pull request –
     as a comment or as the text of a review (_Comment_, _Approve_ or _Request changes_; inline
     comments on the diff are not read). To change your verdict later, edit it or post a new one – only
     your newest comment or review text counts. Dismissing a review withdraws its verdict.

The comment carries a machine-readable block, for example:

```markdown
<!-- visual-review:v1
{"approveAll":{"digest":"sha256:…"},"approvals":[{"item":"theme-default/button-basic--variants","hash":"sha256:…"}],"rejects":[],"notes":[]}
-->

**Visual Review** – all changes approved ([review page](…))
```

Approvals bind to the **content hash** of a screenshot, not to a commit: a later push that leaves an
approved screenshot untouched keeps its approval, a push that changes it again reopens exactly that
one. `approveAll` binds to the digest of the whole report and therefore expires with the next change.

A rejected (or approved) screenshot that a later push fixes back to the baseline turns `unchanged` and
drops out of what the commit status checks – nothing is left to approve. The review page still lists it
(marked `↺`, even with the `unchanged` filter off) so you can confirm it is fixed and clear the now-stale
verdict from your draft; it otherwise keeps piling up unseen in your local review comment.

Only comments and review texts of users with write access count. Bots are ignored, and so are pending
and dismissed reviews. A rejection wins over an approval. The GitHub verdict of a review (_Approve_,
_Request changes_) says nothing about the screenshots – only the block in its text does.

The page connected with a token loads your newest verdict, whether you left it as a comment or in a
review, and saves as a comment: a verdict from a review is superseded by a new comment, not rewritten.

## Where things live

| What                             | Where                                                                                                            |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Report per package (CI artifact) | `visual-review-<package>` – `report.json` + PNGs of changed items, 14 days                                       |
| Baseline per base commit         | `visual-baseline-<package>` – snapshots + `meta.json`, 90 days                                                   |
| Published review data            | `gh-pages`: `visual/pr-<n>/report.json`, `status.json`, `<package>/<name>.<kind>.png`                            |
| Review page                      | `gh-pages`: `visual/` (built from `packages/tools/visual-tests/review-ui`)                                       |
| Reporter                         | `packages/tools/visual-tests/src/visual-reporter.js`                                                             |
| Workflow scripts                 | `scripts/visual-review/` (see `scripts/README.md`)                                                               |
| Workflows                        | `visual-baseline.yml`, `visual-review.yml`, `visual-review-trigger.yml`, `visual-review-ui.yml`, job in `ci.yml` |

The folder `visual/pr-<n>/` is removed when the pull request closes (`pr-preview-cleanup.yml`). The same
workflow can be started manually to clean up leftovers: `delete_closed` removes the deployments of all
pull requests that are already closed (together with folders that belong to no pull request at all),
`stale_days` those without activity for a given number of days – open pull requests included, so their
published report is gone until the next CI run republishes it –, `delete_all` every deployment regardless
of state, and `purge_history` squashes the whole `gh-pages` history into a single commit to reclaim clone
size. The review page in `visual/` and the `.nojekyll` marker are never touched.

## What recomputes the status

| Event                                    | Effect                                                        |
| ---------------------------------------- | ------------------------------------------------------------- |
| Push to the pull request                 | `pending` (or `success` for docs-only changes)                |
| CI-Pipeline of the pull request is done  | report published, status computed                             |
| Comment created, edited or deleted       | status recomputed from the published report                   |
| Review submitted, edited or dismissed    | status recomputed from the published report – through a relay |
| Manual run of the Visual Review workflow | status of the given pull request recomputed                   |

GitHub runs workflows for review events in the context of the pull request: the workflow file comes
from its merge ref and a fork gets a read-only token. `visual-review-trigger.yml` therefore holds no
permission and does nothing but finish; the Visual Review workflow listens for its completion and
recomputes the status in the context of the base repository. Two consequences:

- The relay only runs when the merge ref of the pull request contains `visual-review-trigger.yml` –
  not for a pull request with merge conflicts, and not for a target branch that lacks the file. Such a
  review is not lost: the next CI run, comment or manual run reads it as well.
- A review without a `visual-review` block shows up as a skipped run of both workflows.

## Trust boundary

The reports come from the pull request's own CI run, i.e. from code the pull request controls. The
Visual Review workflow never executes that code: it downloads the artifacts, validates every field and
file name (`merge-reports.mjs`) and publishes only what passes. A pull request could still upload a
report that claims "no changes" – the human review of the code and the branch protection remain the
actual safeguard; the visual review makes intentional changes visible and reviewable, it does not
replace code review.

## Local work

```bash
pnpm snapshots:pull                        # fetch the current develop baseline into the snapshot folders
pnpm --filter @public-ui/theme-default test
pnpm --filter @public-ui/visual-tests review-ui:dev   # the review page against a local report: ?src=<folder>
```

`pnpm test:update:docker <theme>` regenerates a baseline locally in the pinned Playwright container.
